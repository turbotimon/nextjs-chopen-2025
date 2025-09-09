'use client'
export function Time() {
    console.log('Time component rendered on client');
    return (
        <div>Time: {new Date().toLocaleTimeString()}</div>
    );
}
