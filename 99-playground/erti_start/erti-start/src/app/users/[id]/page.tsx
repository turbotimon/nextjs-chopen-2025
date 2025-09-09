// aync only valid for server components
export default async function UserPage(
    // params is convention, you could use any name
    // the rest is definition (ts), it would work without
    {params}: {params: Promise<any>}
) {
    console.log("UserPage params:", params);
    // must be awaited!
    const userID = (await params).id;

    return (
        <div>
            <h1>User Page</h1>
            {/* Add the user ID from the path [id] */}
            <p>User ID: {userID}</p>
        </div>
    );
}
