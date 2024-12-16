
    //   Algebra of Symbols Operations

    // "\u25A0"; - black square
    // "\u2716"; - black cross
    // "\u25CF"; - black circle
    // "\u25CB"; - while circle

    // "\u25AA"; - small black square
    // "\u25FE"; - small while square
    // "\u25c6"; - black diamond
    // "\u25C7"; - while diamond
    // "\u25CF"; - black circle
    // "\u25CB"; - while circle

    const showMetaSymbols = false;

    const NONE = "-";
    const CONT = showMetaSymbols? "\u25A0" : "#"; // black square
    const DIFF = showMetaSymbols? "\u2716" : "$"; // black cross
    const SAME = showMetaSymbols? "\u25CF" : "!"; // black circle
    const OPST = showMetaSymbols? "\u25CB" : "~"; // white circle

    const M_SET = [NONE, CONT, DIFF, SAME, OPST]

    const S_SET = [
            "A", "B", "C", "D", "E",
            "F", "G", "H", "I", "J",
            "K", "L", "M", "N", "O",
            "P", "Q", "R", "S", "T",
            "U", "V", "W", "X", "Y",
            "Z", " ", "_"];

     function isMetaSymbol(symbol){
        return M_SET.indexOf(symbol) >= 0;
    }


    function  isStateSymbol(symbol) {
        return S_SET.indexOf(symbol) >= 0;
    }

class AoSAlgebra {




    static equivalence(arg1, arg2) {
        if (arg1 === NONE || arg2 === NONE) {
         console.log("AoS Algebra: returns = "+ NONE);
            return NONE;
        }
        if (arg1 === arg2) {
        console.log("AoS Algebra: returns = "+ SAME);
            return SAME;
        } else {
        console.log("AoS Algebra: returns = "+ DIFF);
            return DIFF;
        }
    }

    static applied(arg1, arg2) {
        if (arg1 === NONE || arg2 === NONE) {
            return NONE;
        }
        if (!arg1.equalsIgnoreCase(arg2)) {
            return SAME;
        } else {
            return DIFF;
        }
    }

    /**
     * @param arg1
     * @param arg2
     * @return
     */
    static conjunction(arg1, arg2) {

        if (arg1 === NONE && arg2 === NONE) {
            return NONE;
        }
        if (arg1 === NONE && !arg2 === NONE) {
            return arg2;
        }
        if (!arg1 === NONE && arg2 === NONE) {
            return arg1;
        }

        if (arg1 === SAME && arg2 === SAME) {
            return SAME;
        } else {
            return DIFF;
        }
    }

    /**
     * @param arg1
     * @param arg2
     * @return
     */
    static production(arg1, arg2) {
        if (arg1 === NONE || arg2 === NONE) {
            return NONE;
        }
        if (arg1 === SAME) {
            return arg2;
        }
        if (arg2 === SAME) {
            return arg1;
        }
        if (arg1 === arg2) {
            return arg1;
        } else {
            return DIFF;
        }
    }

    /**
     * @param arg1
     * @param arg2
     * @return
     */
    static disjunction(arg1, arg2) {

        if (arg1 === NONE && arg2 === NONE) {
            return NONE;
        }
        if (arg1 === NONE && !arg2 === NONE) {
            return arg2;
        }
        if (!arg1 === NONE && arg2 === NONE) {
            return arg1;
        }

        if (arg1 === DIFF && arg2 === DIFF) {
            return DIFF;
        }
        if (arg1 === DIFF && isStateSymbol(arg2)) {
            return arg2;
        }
        if (isStateSymbol(arg1) && arg2 === DIFF) {
            return arg1;
        }
        if (arg1 === CONT || arg2 === CONT) {
            return CONT;
        }

        if (isStateSymbol(arg1) && isStateSymbol(arg2)) {
            if (arg1 === arg2) {
                return arg1;
            } else {
                return CONT;
            }
        }
        return CONT;
    }

    /**
     * @param currentState
     * @param replacingState
     * @return
     */
    static application(currentState, replacingState) {
        return isMetaSymbol(replacingState) ? currentState : replacingState;
    }

}