export const actions = {
  setDeltaY(newDeltaY) {
    console.log('hey');
    return { type: 'SETDELTAY', deltaY: newDeltaY };
  },
  setScrollability(isScrollable) {
    return { type: 'SETSCROLLABILITY', scrollBoolean: isScrollable };
  },
  setSnappedHighest(isHighest) {
    return { type: 'SETSNNAPPEDHIGHEST', isSnappedHighest: isHighest };
  },
};
