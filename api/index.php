<?php
    header("Access-Control-Allow-Origin: https://tennessine.co.uk");

    $request = array_filter( explode( '/', str_replace(['/elections/api/','/api/'], '', $_SERVER['REQUEST_URI']) ) );
    $resource = array_shift($request);

    if(count($request) == 0) fail(404, "Not found");

    $country = $request[0];
    $accepted_countries = array("uk");
    if(!in_array($country, $accepted_countries)) fail(404, "Not Found");

    $boundary_changes_table = $country . "_boundary_changes";
    $elections_table = $country . "_elections";
    $message_links_table = $country . "_message_links";
    $messages_table = $country . "_messages";
    $parties_table = $country . "_parties";
    $polls_table = $country . "_polls";
    $poll_figures_table = $country . "_poll_figures";
    $pollsters_table = $country . "_pollsters";
    $results_table = $country . "_results";
    $regions_table = $country . "_regions";
    $updates_table = $country . "_updates";

    
    switch($resource){
        case "messages": // messages/{country}/{election} - get messages for a country by election ID
            require 'messages.php';
            break;
        case "parties": // parties/{country} - get parties by country ID
            require 'parties.php';
            break;
        case "polls":   // polls/{country} - get opinion polls by country ID
            require 'polls.php';
            break;
        case "region": // region/{country}/{region} - get results for a region by country and region ID
            require 'region.php';
            break;
        case "regions": // regions/{country} - get list of regions by country ID
            require 'regions.php';
            break;
        case "results": // results/{country}/{election} - get results for a country by election ID
            require 'results.php';
            break;
        case "search": // search/{country}/{query} - get list of regions by country with title or candidate name similarity to query
            require 'search.php';
            break;
        case "slug-lookup": // slug-lookup/{country}/{region-slug} - get country region ID from region slug
            require 'slug-lookup.php';
            break;
        case "updates": // updates/{country}/{election} - get list of changes/updates to regions by country since election
            require 'updates.php';
            break;
        case "special": // special/{country}/{function}/{params} - for special functions unique to country ID
            require $country . '/index.php';
            break;
        default:
            fail(404, "Not found");
    }

    function fail($status, $error){
        http_response_code($status);
        exit( json_encode( array("error" => $error) ) );
    }
?>