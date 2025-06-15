/*==================
 FIREBASE API CONFIG
=====================*/
const firebaseConfig = {
  apiKey: "AIzaSyAHYguXNxgoBQq0rdoFOj9MMppCU9kmE-Y",
  authDomain: "citycoin2025.firebaseapp.com",
  databaseURL: "https://citycoin2025-default-rtdb.firebaseio.com",
  projectId: "citycoin2025",
  storageBucket: "citycoin2025.firebasestorage.app",
  messagingSenderId: "1024446979523",
  appId: "1:1024446979523:web:f2b3b89e039c92aaef7176",
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


function checkme(cbox) {
  let id = cbox.id;
  let x = document.getElementsByName(cbox.name);
  let nput = document.getElementById(cbox.name);
  for (let i = 0; i < x.length; ++i) {
    if (x[i].id === id) {
      if (x[i].checked === true) {
        nput.value = x[i].value;
        nput.dispatchEvent(new Event("input"));
      } else {
        nput.value = "";
        nput.dispatchEvent(new Event("input"));
      }
    } else {
      x[i].checked = false;
    }
  }
  nput.dispatchEvent(new Event("change"));
}

function numberonly(evt) {
  var theEvent = evt || window.event;
  if (theEvent.type === "paste") {
    key = event.clipboardData.getData("text/plain");
  } else {
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
  }
    var regex = /[0-9]/;
  if (!regex.test(key)) {
    theEvent.returnValue = false;
    if (theEvent.preventDefault) theEvent.preventDefault();
  }
}

let inputs = document.querySelectorAll(".nput");
function validation(me) {
    let valid = true;
    me.classList.remove("invalid");
    inputs.forEach((input) => {
      if (input.value == "" || !input.checkValidity() ) {
        input.classList.add("invalid");
        me.classList.add("invalid");
        valid = false;
      }
    });

    if (valid) {
        submitform();
    }
}
function newdetails() {
  const newdata = {
    name: document.querySelector("#fullname").value,
    gender: document.querySelector("#gender").value,
    age: document.querySelector("#inputage").value.toString(),
    phone: document.querySelector("#inputphone").value.toString(),
    regdate: new Date().toLocaleDateString(),
  };
  sessionStorage.setItem("tanarivers", JSON.stringify(newdata));
}
inputs.forEach((nput) => {
  nput.addEventListener("input", (e) => {
    newdetails();
  });
});
  let userform = document.querySelector("#userform");
function submitform() {
  let data = JSON.parse(sessionStorage.getItem("tanarivers"));
  db.collection("tanarivers")
    .add(data)
    .then((docRef) => {
      sessionStorage.removeItem("tanarivers");
      userform.classList.add("submited");
      userform.reset();
    });
}
userform.reset();
