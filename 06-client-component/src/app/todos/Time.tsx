'use client'

import { use, useEffect, useState } from "react";


export function Time() {
    // Mast be INSIDE the JSX component
    // Effects are NOT executed on the server. only the default ("") is used
    const [time, setTime] = useState("");
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);
    });
    console.log('Time component rendered on client');
    return (
        <div>Time: {time}</div>
    );
}
