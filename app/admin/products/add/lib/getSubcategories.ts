export async function getSubcategories() {
    const res = await fetch(`http://localhost:9000/api/subcategories`);
    if (!res.ok) {
        return console.log("error");
    }
    return res.json();
}