export function arrayEquals(a, b) {
    return a.sort().join(',') == b.sort().join(',');
}