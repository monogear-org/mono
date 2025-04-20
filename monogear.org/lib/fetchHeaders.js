export function getHeaders() {
    var details = JSON.parse(localStorage.getItem(localStorage.getItem("currentServer")))
    const credentials = btoa(`${details.username}:${details.password}`);
    return {
        'Authorization': `Basic ${credentials}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
}