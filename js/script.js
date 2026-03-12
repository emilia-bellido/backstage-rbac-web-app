
/*
Page Theme: Backstage Access to an Event
2 Types of User:
1)Backstage Access(Admin)
2)No Access(Staff)

UserNames for GeneraL Staff= user1, user2..., user10
UserNames for Admin = admin1, admin2, admin3
Passwords General staff (4 digit numeric passwords)  = 1111...9999 ,1000,1010,1212
Passwords Admin (4 digit numeric passwords) = 1100,2200,3300

Validation for User Login:
UserNames: Only letters and Names (with space if desired). UpperCase /LowerCase
Passwords: 4 digits only numeric passwords

Key Differences between roles:

1)Backstage Access Admin:
    -Actions with  Other users (including other Admin):
       1) Revoke Access
       2) Delete
       3) Grant Access
       4)Undo and come back to original list
    -Actions with Own Profile
        1)Nothing
    -Information Display
        1)Info of every user(including other Admin) =(Name, LastName, UID, email, userName, password)

2)General Access:
    -Actions with Other users (including other Admin):
      1) Can see Admin profile but not other general profiles
    -Actions with Own Profile
        1)Nothing
    -Information Display
        1)Own information = (Name, LastName, UID, email, userName, password)
        2)Admin ifno = only email name, and uid

Buttons Functionality:

1)Delete Button (.deleteBtn)
    -Hides card from view (does NOT remove from array)
    -Undo can restore it
    -Add deleted user´s UID to an array of deleted Users
    -Visible to: Admins only

2)Grant Access Button (.promoteBtn)
    -Changes user.admin = true
    -Updates role from "No Access" to "Backstage Access"
    -Moves card from "No Access" section to "All Access" section
    -Re-renders all cards
    -Visible to: Admins only

3)Remove Access Button (.removeAccessBtn)
    -Changes user.admin = false
    -Updates role from "Backstage Access" to "No Access"
    -Moves card from "All Access" section to "No Access" section
    -Re-renders all cards
    -Visible to: Admins only

4)Undo Button (#undo)
    -Rebuilds usersObjects from original baseUsers data
    -Restores all deleted/promoted/demoted cards to original state
    -Re-renders all cards
    -Resets deletedUIDs array blank
    -Visible to: Admins only

Display of Page:
    1)Users Profile
    2)Admin
    3)(If admin) Rest of Users

Notes:
-No saved changes = Every time a user logs out, the original list of users gets resetted
-Login Name will always show at top

 */





/*
Class User:
1)Create object of user
2)Attributes: Name, LastName, UID, email, userName, password, imageProfile, admin, role
2) Decide which role each user is
3)Create card for each user
 */

class User {
    constructor(uid, name, lastName, email, userName, password, admin, imageProfile) {
        this.uid = uid;
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.userName = userName;
        this.password = password;
        this.admin = admin;
        this.role = this.roleDecider(); //outputs the word "Backstage Access" or "No Access"
        this.img = imageProfile;
    }


    //function to show category of user (admin or staff)
    roleDecider() {

        if (this.admin) {
            return "Backstage Access";
        } else {
            return "No Access";
        }
    }

//Make individual card for each user
    makeCard() {
        let styleClass = ""; //decides what the card is going to look like
        let buttonName = ""; //decides which  button name to assign to the (grants access/removes access)
        let buttonClass = ""; // decides which button class to assign so event listeners can target it later

        if (this.admin === true) { //if admin
            styleClass = "adminCards";
            buttonName = `<i class="bi bi-arrow-down-circle"></i> Remove Access`;
            buttonClass = `removeAccessBtn`;
        } else {
            styleClass = "generalCards"; //if user
            buttonName = `<i class="bi bi-arrow-up-circle p-2"></i>Grant Access`;
            buttonClass = `promoteBtn`;
        }


        return `
        <div class="card my-4 mx-4 ${styleClass}"  id="${this.uid}" style= "max-width: 900px; margin: auto; border-radius: 15px;">
            <div class="row h-100 g-0"> <!--putting everything in a row so it can be horizontally layed out-->
                <!---IMAGE--->
                <div class="col-md-4 justify-content-center p-4 d-flex align-items-center">
                    <div style="width: 130px; height: 130px; overflow: hidden; border-radius: 50%;">
                        <img src="${this.img}" class="h-100 w-100 object-fit-cover" alt="${this.name}">
                    </div>
                </div>
                <!---IMAGE--->
                
                <div class="col-md-8"> <!---Text----> 
                
                      <div class="card-body">
                        <!--NAME BADGE & UID-->
                        <div class="mb-3">
                            <div class="d-flex flex-wrap flex-column">
                                <h5 class="card-title">${this.name} ${this.lastName}</h5> <!--First Name and Last Name-->
                                
                                <div class="d-flex flex-wrap justify-content-between align-items-baseline w-100">
                                    <h5 class="card-text m-0"><span class="badge text-bg-secondary">${this.role}</span></h5> 
                                      <!--Calling on the method so i know whether staff(no access to backstage) 
                                or admin(access to backstage)----->
                                    <p class="small">UID: ${this.uid}</p> <!--UID-->                              
                                </div>  
                            </div>
                         </div>   
                        <!---Contact info-->
                         <div class="mb-4">
                              <label class="small fw-bold d-block">CONTACT</label>
                              <p class="card-text">${this.email}</p> <!--EMAIL-->
                         </div>
                           <!----SENSITIVE INFORMATION(ONLY ADMIN GETS TO SEE)---->
                         <div class="row mb-1 admin-info">
                            <div class="col-6">
                              <label class="small fw-bold d-block">USER NAME</label>
                              <p class="card-text">${this.userName}</p> <!--username-->
                            </div>
                            <div class="col-6">
                                <label class="small fw-bold d-block">PASSWORD</label>
                                 <p class="admin-info">${this.password}</p><!--password-->
                            </div>  
                         </div>
                         
                         <hr id="line" class="w-100 mt-0">
                          
                          <!--BUTTONS-->
                         <div class="d-flex justify-content-end gap-2">
                             <button type="button" class="btn btn-danger deleteBtn"  data-index="${this.uid}" data-bs-toggle="modal" 
                                    data-bs-target="#modal"> <i class="bi bi-trash p-2"></i> Remove</button> 
                                    <!--data-index will be connected to each iud which can be use to target with functions -->
                                
                             <button type="button" class="btn btn-warning ${buttonClass}"  data-index="${this.uid}" data-bs-toggle="modal" 
                             data-bs-target="#modal">${buttonName}</button>
                             <!--Hydrid Button: If USER IS ADMING (BUTTON WILL BE Revoke Access) If USER IS GENERAL (BUTTON 
                             WILL BE Grant Access)---->
                         </div>
                      </div>
                </div>
           </div>
        </div>`
    }
}
 /************************************************************************************/


/*Raw User Data:
* Users 1-12: General Access
* Admin 1-3: admin role =true */

let baseUsers = [
    {uid:"YT621", name: "Alice",    lastName: "Johnson",  email: "alice@email.com",    userName: "user1", password: "1111",  admin: false, imageProfile: "images/user1_img.jpg"},
    {uid:"7JZLQ", name: "Marcus",   lastName: "Thompson", email: "marcus@email.com",   userName: "user2",  password: "2222", admin: false, imageProfile: "images/user2.jpg" },
    {uid:"82WHI", name: "Sofia",    lastName: "Martinez", email: "sofia@email.com",    userName: "user3",  password: "3333", admin: false, imageProfile: "images/user3.jpg" },
    {uid:"8ORT8", name: "James",    lastName: "Williams", email: "james@email.com",    userName: "user4",  password: "4444", admin: false, imageProfile: "images/user4.jpg" },
    {uid:"9V971", name: "Priya",    lastName: "Patel",    email: "priya@email.com",    userName: "user5",  password: "5555", admin: false, imageProfile: "images/user5.jpg"  },

    {uid:"AB9NQ", name: "Ethan",    lastName: "Brown",    email: "ethan@email.com",    userName: "user6",  password: "6666", admin: false, imageProfile: "images/user6.jpg"},
    {uid:"B8016", name: "Chloe",    lastName: "Davis",    email: "chloe@email.com",    userName: "user7",   password: "7777",admin: false, imageProfile: "images/user7.jpg"},
    {uid:"KBVJY" , name: "Liam",     lastName: "Garcia",   email: "liam@email.com",    userName: "user8",  password: "8888", admin: false, imageProfile: "images/user8.jpg"},
    {uid:"LVE8E", name: "Nadia",    lastName: "Kim",      email: "nadia@email.com",    userName: "user9",  password: "9999", admin: false, imageProfile: "images/user9.jpg" },
    {uid:"PTV2J" , name: "Omar",     lastName: "Hassan",   email: "omar@email.com",     userName: "user10",  password: "1000", admin: false, imageProfile: "images/user10.jpg" },

    {uid:"TKKVU" , name: "Isabella", lastName: "Lopez",    email: "isabella@email.com", userName: "user11", password: "1010", admin: false, imageProfile: "images/user11.jpg"},
    {uid:"UWG6Y" , name: "Noah",     lastName: "Wilson",   email: "noah@email.com",     userName: "user12",  password: "1212",admin: false, imageProfile: "images/user12.jpg" },
    {uid:"Z4AUM" , name: "Yuna",     lastName: "Chen",     email: "yuna@email.com",     userName: "admin1", password: "1100", admin: true,  imageProfile: "images/admin1.jpg" },
    {uid:"Z88UO", name: "Dante",    lastName: "Russo",    email: "dante@email.com",    userName: "admin2",  password: "2200", admin: true,  imageProfile: "images/admin2.jpg"},
    {uid:"ZW4L5", name: "Zoe",      lastName: "Anderson", email: "zoe@email.com",      userName: "admin3", password: "3300", admin: true,  imageProfile: "images/admin3.jpg"}]

Object.freeze(baseUsers);// Prevents baseUsers from being modified
/*************************************************************************************************/


//Getting elements from HTML

//making an instance of the modal so i can use ".show()" and other functions of modals
const modalLogin = document.getElementById("login");
const modalInstance =  new bootstrap.Modal(modalLogin);

//form input login
const userNameInput = document.getElementById("userName");
const passwordInput = document.getElementById("password");

//Input boxes parents --> Target borders, etc

const inputBoxes = document.querySelectorAll(".input-group");
console.log(inputBoxes);

//Navbar
const navbar = document.getElementById("navbar");

//grabbing buttons

const undoBtn = document.getElementById("undo");
const loginBtn = document.getElementById("userBtn");

//Containers for card

// general users cards
const cardsUsers = document.getElementById("cardsUsers");

// admin cards
const adminContainer = document.getElementById("adminCards");

// current user card
const myProfile = document.getElementById("myProfile");

//section that holds all the cards + text
const mainContainer = document.getElementById("mainContainer");

/***********************************************************************************************/


//New array "UsersObjects" --> contains user objects of my original raw data (baseUsers)
//Convert all my raw data information TO User Objects => functions can be applied .

let usersObjects = baseUsers.map(user =>
    new User(user.uid, user.name, user.lastName, user.email, user.userName,
        user.password, user.admin, user.imageProfile));

/*.map() => loops through baseUsers objects and makes them a User Object
Equivalent to:
User user = new User(uid, Name, Last Name,....)
 */
console.log(usersObjects);




/**************************************************************************************/

//Cards Rendering

/*General User(No Access)
* 1) See their own profile cards
* 2) See admin roles
*
* Logic: Target user card, target admin === true and render cards
* How? Username input from the login
* */

let currentUser; //who is logged in
const adminCards = usersObjects.filter(user => user.admin === true); //only admin cards


/* Render Cards for Admin Accounts: Display admin profile, rest of admin users, and a complete list of
general users.
Parameters: full array of all User Objects, and userName of whoever is logged in
 */
const renderCards = (usersObjects, userName) =>{

    cardsUsers.innerHTML = ``;

    //remove the "d-none" class that was added in the admin render helper function
    const cardUsersContainer = document.getElementById("cardsUsersContainer");
    cardUsersContainer.classList.remove("d-none");

    displayMyCard(userName); //displaying own card
    displayAdminCards(userName); //display  cards of only admins users

    /*
        Display the rest of the list of general users: exclude own profile, and any admin role
     */
    const updatedList = usersObjects.filter(user => user.userName !== userName && user.admin === false );

    updatedList.map((card)=> {
        //every single user in my array will have a card that will be added into the cardsUser div.
        cardsUsers.innerHTML += card.makeCard();
        //makeCard is the method that converts the user into a display card
    })

    deleteButtons(); //show delete button & add functionality
    removeAccess(); //show removeAccess button & add functionality
    promoteButton();//show promoteButton button & add functionality

    undoBtn.classList.remove("invisible"); // show undo button on page

};


/*
 Render Cards for General Users (NO ACCESS): Display own profile, and  admin profiles (limited information)
Parameters: userName of user
 */
const displayCardsForStaffs = (userName) => {

    displayMyCard(userName); //Helper function that displays own profile Card
    displayAdminCards(userName); //Helper Function that displays Admin Cards

    //Obtaining a list of the admins
    const currentAdmins = usersObjects.filter(u => u.admin === true);

    //Loop through currentAdmins and hide the sensitive information
    for(let i = 0; i < currentAdmins.length; i++) {

        /*Make every card from HTML a "cardElement"
        How? Every card has an id of their own UID
        Target UID --> Target card --> name it cardElement

         */
        const cardElement = document.getElementById(currentAdmins[i].uid);

        //Safety (IF BLOCK): if for some reason the displayAdminCards() hasnt been rendered, my code wont crash

        if(cardElement) { //If a card was found ==> target the div with class admin-info and hide the elements in it
            const info = cardElement.querySelectorAll(".admin-info");
            for(let j = 0; j < info.length; j++){
                info[j].classList.add("d-none");
            }
        }
    }

    //Display NO BUTTONS : User cant modify anything
    hideButtons();
    //User cant see other users: clearing it from the html
    const cardUsersContainer = document.getElementById("cardsUsersContainer");
    cardUsersContainer.classList.add("d-none");

}

//Render Cards for own User: User should be able to see their own profile
/*
Parameters: userName
If Block: if the user is admin, buttons show ==> hide them because Admin cant edit own profile
 */

const displayMyCard = (userName) => {

   // myProfile.innerHTML = "";
    const user = usersObjects.find(user => user.userName === userName);
    const uid = user.uid; //getting UID so card can be affected

    //targeting div myProfile where card will be placed
    myProfile.innerHTML = user.makeCard();

    if (user.admin) { //User==admin
        const cardElement = document.getElementById(uid); //get Card on the html

        if (cardElement) {

            //Find delete button on card
            const deleteBtn = cardElement.querySelector(".deleteBtn");
            //hide delete button
            deleteBtn.classList.add ("invisible");

            //Hybrid Button: Remove Access or Grant Access
            //If user is admin = the button will be removeAccessBtn
            const actionBtn = cardElement.querySelector(".removeAccessBtn") ||
                cardElement.querySelector(".promoteBtn");
            if (actionBtn) {
                actionBtn.classList.add("invisible");
            }

        }
    }

}



/*Render Admin Cards for General User or Admin:
1)General User: All current admins will show (should be 3)
2)Admin User: Other admins should show (except their own profile) in the All Access div
Parameters : userName
 */

const displayAdminCards = (userName) => {
    adminContainer.innerHTML =""; //clear div where Admin cards are for clean slate

    const user = usersObjects.find(user => user.userName === userName);

    //list of only admins & users that ther IUD isn´t found on my array of deleted UIDS
    const currentAdmins = usersObjects.filter(u => u.admin === true && !deletedUIDs.includes(u.uid));

    if(user.admin === true){ //if the user is admin, their profile shouldnt show in the admin again
        let otherAdmins = currentAdmins.filter(u => u.userName !== userName);
        //using the list of only users that are admins, filter whatever its not the same as the current user

        //make every admin a card and add it to div
        otherAdmins.map((card)=> {
            adminContainer.innerHTML += card.makeCard();
        })
    }else{ //if user HAS NO ACCESS just map the list of all admins
        //make every admin in my users list a card
        currentAdmins.map((card)=> {
            adminContainer.innerHTML += card.makeCard();
            //makeCard is the function that makes it happen
        })
    }
}
/*************************************************************************************/

/*Buttons Functionality */

let deletedUIDs = []; // tracks deleted users - will remember which users not to show again

const deleteButtons = () => {

    // SELECTING ALL THE DELETE BUTTONS AND PUTTING IN THEM IN A NODE LIST
    const deleteButtons = document.querySelectorAll(".deleteBtn");

    //adding event listener to every button
    for (let i = 0; i < deleteButtons.length; i++) {

        deleteButtons[i].addEventListener('click',  () => {

            //storing UID of the button clicked so i can target that object and remove it from the cards
            // data-index holds the UID of the user --> set in makeCard() on the button
            const uid = deleteButtons[i].getAttribute("data-index");
            console.log(uid);
            deletedUIDs.push(uid);

            document.getElementById(uid).style.display = "none";
            //equivalent to class = d-none

        })
    }
}

//Hide all buttons
const hideButtons = () => {

    // SELECTING ALL THE  BUTTONS AND PUTTING IN THEM IN NODE LISTS
    const deleteButtons = document.querySelectorAll(".deleteBtn");
    const promoteButtons = document.querySelectorAll(".promoteBtn");
    const removeAccessBtn = document.querySelectorAll(".removeAccessBtn");

    //hiding every delete button
    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].style.display = "none";
    }

    //hiding every promote button
    for (let i = 0; i < promoteButtons.length; i++) {
        promoteButtons[i].classList.add("invisible");
    }

    //hiding every removeAccess button
    for(let i = 0; i < removeAccessBtn.length; i++) {
        removeAccessBtn[i].classList.add("invisible");
    }

    //hiding undoButton
    undoBtn.classList.add("invisible");

}



//Undo button: Add an event listener so it re-renders all the cards / and make it appear if admin
const undoButton = () => {
    undoBtn.addEventListener("click", () => {

        //Re-rendering cards with original baseUsers list
        usersObjects = baseUsers.map(user => new User(user.uid, user.name, user.lastName, user.email, user.userName,
            user.password, user.admin, user.imageProfile));

        //resetting deletedUIDs
        deletedUIDs = [];

        //calling the renderCards function because Admins are the only ones who can see undoButton
        renderCards(usersObjects, currentUser.userName);
    })

}


//Promote Button: Change the admin to true and re-render cards to appear in admin section
const promoteButton = () => {
    const promoteButtons = document.querySelectorAll(".promoteBtn");

    for (let i = 0; i < promoteButtons.length; i++) {
        promoteButtons[i].addEventListener("click", () => {

            let uidUser = promoteButtons[i].getAttribute("data-index");
            let user = usersObjects.find(user => user.uid === uidUser);

            /*
            Safety Block (IF ) = if user is found, change the admin to true, change the output from No Access to
            backstage access, and re-render cards so now this user is part of the admin list             */
            if (user) {
                user.admin = true;
                user.role = user.roleDecider();
                renderCards(usersObjects, currentUser.userName);
            }

        })


    }
}

//Remove Access = Change the admin to false, and re-render cards to appear in general users section

const removeAccess = () => {
    const removeAccessBtn = document.querySelectorAll(".removeAccessBtn");
    for (let i = 0; i < removeAccessBtn.length; i++) {

        removeAccessBtn[i].addEventListener("click", () => {

            let uidUser = removeAccessBtn[i].getAttribute("data-index");
            let user = usersObjects.find(user => user.uid === uidUser);

            /*
            Safety Block (IF ) = if user is found, change the admin to false, change the output from
            backstage access to  No Access, and re-render cards so now this user is part of the general no access list             */
            if (user) {
                user.admin = false;
                user.role = user.roleDecider();
                renderCards(usersObjects, currentUser.userName);
            }
        })
    }
}


/*************************************************************************************/
//NAVBAR
/*1)UNHIDE IT
* 2) MODIFY USER LOGGED IN INFO */

const navBarDisplay = (currentUser) => {
    navbar.classList.remove("invisible"); //make the nav bar visible

    //targetting userNav which is where the name of the username will go
    const userNav = document.getElementById("userNav");
    //Current user is saved at top
    userNav.innerHTML = `${currentUser.name} ${currentUser.lastName}`;
};

/*************************************************************************************/



//Login Logic

//Adding an event listener to login button in modal
document.getElementById("userBtn").addEventListener("click", (e) => {


    //get Value from fields in login modal
    const userName = userNameInput.value.trim();
    const password = passwordInput.value.trim();

    //veryfing i can see it
    console.log(password);
    console.log(userName);

    // Error *
    const asterisks = document.querySelectorAll(".login-error");

    //Function that clears the wrong info signal and resets the placeholder
    const clearUI = () => {
        asterisks[0].classList.add("invisible");
        asterisks[1].classList.add("invisible");
        userNameInput.setAttribute('placeholder', "User Name");
        passwordInput.setAttribute('placeholder', "Password");
    };

    clearUI();




    //Regex Validation:
    /*
    Username = just letters/ numbers / space
    Password= 4 digital numbers (just numbers )

     */

    //Username regex
    let userNameRegex = /^[a-zA-Z0-9]+(?:[ _.-][a-zA-Z0-9]+)*$/; //letters + numbers and spaces

    //Password Regex
    let passwordRegex = /^\d{4}$/; //just 4 digits numbers



    //putting my validation results, input boxes, and error message so i can access it
    let validationResults = [
        {
            name: "userName", //same as input id box
            result: userNameRegex.test(userName),
            error: "Letters/Numbers only",
            input: userName
        },
        {
            name: "password", //same as password box
            result: passwordRegex.test(password),
            error: "Must be a 4 digit pin",
            input: password

        }

    ]

    let isFormValid = true;
    // Loop through each field: if regex fails or field is empty, show error and mark form as invalid
    for (let i = 0; i < validationResults.length; i++) {
        const inputBox = document.getElementById(validationResults[i].name); //grabbing each input box
        const inputValidation = validationResults[i].result;
        const inputField = validationResults[i].input;


        if (!inputValidation || inputField === "") {
            isFormValid = false;

            asterisks[i].classList.remove("invisible");

            //clear input and show message
            inputBox.value = "";
            inputBox.setAttribute('placeholder', `Field Required: ${validationResults[i].error}`)

        }
    }

    //check our list of users once the regex has passed
    if (isFormValid) {
        try { //does the user exist in our data list
            const matchedUser = usersObjects.find((user) => user.userName === userName && user.password === password);
            /*(user) =  represents each object in my usersObject arraylist
            * ==> "do this to every object"
            * user.userName === userName = compare the user.userNames to the userName input in the form
            * user.password === password = compare the stored password to what was typed in the form*/

            console.log(matchedUser);

            if (matchedUser) {
                asterisks[0].classList.add("invisible"); //remove *
                asterisks[1].classList.add("invisible");
                mainContainer.classList.remove("d-none"); //show main container with all the cards
                successLogin(matchedUser); //helper function that calls render cards


            } else {
                alert("User Not Found");
                userNameInput.value = "";
                passwordInput.value = "";
            }
        }
        catch(error) {
            console.log("System Error during login:", error)

        }
    }
});


//helper function for login once user is found
// receives the matched user, hides modal, shows navbar, and decides the correct card view based on role

const successLogin = (user) => {

    currentUser = user;
    modalInstance.hide();
    //hide login buttons
    document.getElementById("userBtn").style.visibility = "hidden";
    //show logout buttons
    document.getElementById("logoutNav").classList.remove("invisible");
    //show navbar
    navBarDisplay(user);
    undoButton(); // add functionality to undoButton
    //decide whether its admin or staff and what cards to show
    if (user.admin) {
        //show ALL cards
        renderCards(usersObjects, user.userName);

    } else {
        displayCardsForStaffs(user.userName);
        promoteButton(); // called separately here because renderCards() isn't called for staff users
    }

}


//when logout is clicked out
document.getElementById("logoutNav").addEventListener("click", () => {

    //  Line that resets users back to original data on logout
    usersObjects = baseUsers.map(user => new User(user.uid, user.name, user.lastName, user.email, user.userName,
        user.password, user.admin, user.imageProfile));

    mainContainer.classList.add("d-none");

    //show login buttons
    document.getElementById("userBtn").style.visibility = "visible";

    //hide navbar
    navbar.classList.add("invisible");
    //show login  modal back up
    modalInstance.show();

    deletedUIDs = [];



});

/*************************************************************************************/
/*************************************************************************************/
/*Modal settings */


//Resetting modal so no information is saved when reclicked after another user uses it
modalLogin.addEventListener('show.bs.modal', () => {
    document.getElementById("userForm").reset(); //resets forms value to og values

});

 //Modal pop when page is loaded
window.addEventListener("load", () =>{
    modalInstance.show();
});
