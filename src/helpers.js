export const isNear = (element, e, distance) => {
    const rect = element.getBoundingClientRect();

    return e.x >= rect.left - distance && e.x <= rect.right + distance
        && e.y >= rect.top - distance && e.y <= rect.bottom + distance;
}
