export async function getCategories() {
    const res = await fetch(`http://localhost:9000/api/categories`);
    if (!res.ok) {
        return console.log("error");
    }
    return res.json();
}