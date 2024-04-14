"use client";

import UKConstituencySearchSection from "src/components/UK/UKConstituencySearchSection/UKConstituencySearchSection";
import UKElectionResultsSection from "../../../components/UK/UKElectionResultsSection/UKElectionResultsSection";
import UKPollingSection from "src/components/UK/UKPollingSection/UKPollingSection";
import { useEffect, useState } from "react";
import { Party, Region } from "src/Types";
import { Endpoint } from "src/Constants";
import { partyIdToDisplayId } from "src/lib/UK";

export default function UKGeneralElections(){
    const [regions, setRegions] = useState<Region[]>([]);
    const [parties, setParties] = useState<Party[]>([]);
    useEffect( () => {
        const getData = async () => {
            const partyData : Party[] = await fetch(Endpoint + "/parties/uk").then( res => res.json() );
            partyData.forEach( party => party.displayId = partyIdToDisplayId(party.id) );
            setParties(partyData);

            const regionData : Region[] = await fetch(Endpoint + "/regions/uk").then( res => res.json() );
            setRegions(regionData);
        };
        getData();
    }, []);
    
    return ( 
        <main>
            <section>
                <h1>Election Results</h1>
                <UKElectionResultsSection regions={regions} parties={parties} />
            </section>
            <section className="shaded purple">
                <h1>Find A Constituency</h1>
                <UKConstituencySearchSection />
            </section>
            <section>
                <h1>Opinion Polls</h1>
                <UKPollingSection parties={parties} />
            </section>
        </main>
    )
}