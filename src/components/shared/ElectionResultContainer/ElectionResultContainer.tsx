import { RefObject, forwardRef, useState } from 'react';
import styles from './ElectionResultContainer.module.css';

export default forwardRef(function ElectionResultContainer( 
    { dimensions, messages, messagesOpenOnLoad, map, title, summary, children } : { 
        dimensions: {w:string,h:string,minW:string,minH:string}, 
        messages?: React.ReactNode[],
        messagesOpenOnLoad?: boolean,
        map: React.ReactNode, 
        title : string[]
        summary? : React.ReactNode,
        children : React.ReactNode 
    }, 
    ref : RefObject<HTMLDivElement>
){
    while(title.length < 3) title.push("");
    let [messagesVisibility, setMessagesVisiblity] = useState<boolean>(messagesOpenOnLoad || false);

    return (
        <div ref={ref} className={styles["election-container"]} style={{height:dimensions.h, minHeight:dimensions.minH}}>
            { messages && messages.length > 0 &&
                <div className={styles["election-messages-container"] + (messagesVisibility ? " " + styles["visible"] : "")}>
                    <div className={styles["election-messages-inner-container"]}>
                        {messages}
                    </div>
                </div>
            }
            <div className={styles["election-results-container"]} style={{width:dimensions.w, minWidth:"min(100vw, " + dimensions.minW + ")"}}>
                <div className={styles["election-heading-container"]}>
                    <div className={styles["election-title"]}>
                        { messages &&
                            <img src="/images/messages.svg" className={styles["election-messages-button"]} onClick={() => {setMessagesVisiblity(!messagesVisibility)}} />
                        }
                        <h2>
                            <div className={styles["election-title-text"]}>{title[0]}</div>
                            <div className={styles["election-subtitle-text"]}>
                                <span>{title[1]}</span><br/>
                                <span>{title[2]}</span>
                            </div>
                        </h2>
                    </div>
                    {summary}
                </div>
                <div className={styles["election-map-container"]}>
                    {map}
                </div>
            </div>
            {children}
        </div>
    )
});