"use client";

import styles from './Header.module.css';
import { usePathname } from 'next/navigation';

interface LinkDetails {
    title: string,
    path: string
}

export default function Header( { links = [] } : { links? : Array<LinkDetails> } ){
    const pathname = usePathname();

    return (
        <header id={styles["header"]}>

            <a href="/" id={styles["logo-container"]}>
                <img src="/images/logo.svg" />
            </a>

            <h1>United Kingdom</h1>

            <nav>
                <ul>
                    {
                        links.map( (link : any, index: number) => {
                            return (
                                <li key={index} className={pathname.startsWith(link.path) ? styles["selected"] : ""}>
                                    <a href={link.path}>{link.title}</a>
                                </li>
                            )
                        })
                    }
                </ul>
            </nav>
        </header>
    )
}