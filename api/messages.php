<?php
    if(count($request) != 2) fail(404, "Not found");

    require_once './functions/fetch.php';
    $group = $request[1];

    /* result_types
        0: percentage table
        1: raw table
    */
    
    try{
        $messages = fetch(
            "SELECT messages.id, messages.date, messages.square, messages.old_square, messages.header, messages.text, links.id as link, links.type, links.title as link_title, results.party, results.votes 
            FROM $messages_table as messages
            LEFT JOIN $message_links_table as links
            ON links.message_id = messages.id
            LEFT JOIN $results_table as results
            ON results.election_id = links.election_id AND results.region_id = links.region_id
            WHERE messages.group_id = :group",
            [':group' => $group]
        );

        $parsed_messages = array();
        foreach($messages as $message){
            if(!isset($message['link'])){
                $message_array = array("date" => $message['date'], "square" => $message['square'], "old_square" => $message['old_square'], "text" => $message['text']);
                if($message['header'] == '0') $message_array['no_header'] = true;
                if(isset($message['type']) && $message['type'] != '0') $message_array['result_type'] = $message['type'];
                $parsed_messages[] = $message_array;
                continue;
            }

            $match = false;
            foreach($parsed_messages as &$parsed_message){
                if($parsed_message['id'] == $message['id']){
                    $match = true;
                    $parsed_message['results'][] = array("party" => $message['party'], "votes" => $message['votes']);
                    break;
                }
            }

            if(!$match){
                $message_array = array(
                    "id" => $message['id'],
                    "date" => $message['date'],
                    "square" => $message['square'],
                    "old_square" => $message['old_square'],
                    "text" => $message['text'],
                    "results" => array(
                        array("party" => $message['party'], "votes" => $message['votes'])
                    )
                );
                if($message['header'] == '0') $message_array['no_header'] = true;
                if(isset($message['type']) && $message['type'] != '0') $message_array['result_type'] = $message['type'];
                if(isset($message['link_title'])) $message_array["link_title"] = $message['link_title'];
                $parsed_messages[] = $message_array;
            }
        }

        foreach($parsed_messages as &$pm){
            unset($pm['id']);
        }
        array_multisort(array_column($parsed_messages, 'date'), SORT_DESC, $parsed_messages);

        echo json_encode($parsed_messages, JSON_NUMERIC_CHECK);
    }
    catch(Exception $error){ fail(500, "Internal server error"); }
?>