import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, onValue, child, get, update } from "firebase/database";
import Bus from '../bus.js'

// Set the configuration for your app
// TODO: Replace with your project's config object
const firebaseConfig = {
    apiKey: "AIzaSyBR0op0OOYr1Wrvu6PP3boYVllHNz6II0I",
    authDomain: "rtdatabase-f9ced.firebaseapp.com",
    databaseURL: "https://rtdatabase-f9ced-default-rtdb.firebaseio.com",
    projectId: "rtdatabase-f9ced",
    storageBucket: "rtdatabase-f9ced.appspot.com",
    messagingSenderId: "440621398551",
    appId: "1:440621398551:web:e45a55716332396942ba52",
    measurementId: "G-40C4J41K3W"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const UserTable = ref(database, "UserList")

/**取得ScriptState資料 */
export async function GetScriptState() {
    var database = ref(getDatabase());
    return await get(child(database, 'LPPS/ScriptState/-MxdEBfrpQ84MgjqLVOl')).then((snapshot) => {
        if (snapshot.exists()) {
            var list = snapshot.val();
            return list;
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}


/**開始監視Script State資料變化 */
export function StartScriptStateListen(eventKey) {
    try {
        const starCountRef = ref(database, 'LPPS/ScriptState/-MxdEBfrpQ84MgjqLVOl');
        onValue(starCountRef, async (snapshot) => {
            const data = snapshot.val();
            Bus.$emit('ScriptStateOnChange', data)
        });
    } catch (error) {
        console.log(error)
    }

}
/**開始監視APP State資料變化 */
export function StartAPPStateListen(eventKey) {
    try {
        const starCountRef = ref(database, 'LPPS/APPState');
        onValue(starCountRef, async (snapshot) => {
            const data = snapshot.val();
            Bus.$emit(eventKey, data)
        });
    } catch (error) {
        console.log(error)
    }
}

/**開始監視DO狀態資料變化 */
export function StartDOStateListen(eventKey) {
    try {
        const starCountRef = ref(database, 'LPPS/ControlBoardValues');
        onValue(starCountRef, async (snapshot) => {
            const data = snapshot.val();
            Bus.$emit(eventKey, data)
        });
    } catch (error) {
        console.log(error)
    }
}


export function DOStateChange(doNumber, state) {
    const updates = {};
    updates['/ControlBoardDOSwitch'] = {
        command: doNumber + ',' + !state
    };
    update(ref(database, `LPPS/`), updates);
}
export function AllDOOff() {
    const updates = {};
    updates['/ControlBoardDOSwitch'] = {
        command: 'ALL,true'
    };
    update(ref(database, `LPPS/`), updates);
}

export function AllDOOn() {
    const updates = {};
    updates['/ControlBoardDOSwitch'] = {
        command: 'ALL,false'
    };
    update(ref(database, `LPPS/`), updates);
}


export function QueryRequest(queryItem, options) {
    const updates = {};
    updates['/Query/Request'] = {
        Item: queryItem,
        Options: JSON.stringify(options)
    };
    update(ref(database, `LPPS/`), updates);
}

/**開始監視DO狀態資料變化 */
export function StartQueryResponseListen(eventKey) {
    try {
        const starCountRef = ref(database, 'LPPS/Query/Response');
        onValue(starCountRef, async (snapshot) => {
            const data = snapshot.val();
            Bus.$emit(eventKey, data)
        });
    } catch (error) {
        console.log(error)
    }
}
