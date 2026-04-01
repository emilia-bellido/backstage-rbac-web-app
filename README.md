# backstage-rbac-web-app
A role-based user management application (RBAC) built with Vanilla JavaScript and OOP. Features secure Regex validation, administrative state control, and data integrity using Object.freeze() for automatic logout resets.
https://emilia-bellido.github.io/backstage-rbac-web-app/

Project Summary:
Backstage Access is a role-based user management web application themed around event backstage access.
The website has two types of credential users Admins (Backstage Access) and Staff (No Access).

Core functionalities:
-Login system with regex validation and User account validation
-Role-based card rendering
-Administrative control
-Once logged in, the application determines the user's role and displays information accordingly.


Admin users can:

1)View all users including other admins and general users
2)Grant backstage access to staff members (GRANT ACCESS )
3)Revoke backstage access from other admins (REMOVE ACCESS)
4)Temporarily "HIDES" cards from view
5)Undo all changes and restore the original user list

Staff users can:

1)View only their own profile with full details
2)View admin cards with limited information (name, email, and UID only — no username or password)
3)Perform no administrative actions

No AUTO-SAVE.  When a user logs out, the user list resets to its original state automatically.


How to Set up Web Application:

Requirements:
-Web browser and a local server.
-No installation or dependencies are needed.

Steps to Open Project:

1)Unzip the project folder
2)Open the folder in your editor
3)Launch the project using Live Server
4)The login modal will appear automatically on page load

Test credentials:

| Username | Password | Admin |
| user1    | 1111 | false |
| user2    | 2222 | false |
| user3    | 3333 | false |
| user4    | 4444 | false |
| user5    | 5555 | false |
| user6    | 6666 | false |
| user7    | 7777 | false |
| user8    | 8888 | false |
| user9    | 9999 | false |
| user10   | 1000 | false |
| user11   | 1010 | false |
| user12   | 1212 | false |
| admin1   | 1100 | true |
| admin2   | 2200 | true|
| admin3   | 3300 | true|



Design Choices

The application uses a dark theme with gold and cyan accents to reinforce the backstage/VIP aesthetic.

-Admin cards are styled with a cyan glow to visually distinguish them from general staff cards which use a gold border.
-The background uses a fixed cover image with a blurred, semi-transparent overlay.
-Fonts: Two custom fonts— Rubik Mono One for headings to give a bold, technical feel, and Pathway Gothic (body text).
-Cards: Hover scale animation to make interface feel more interactive

Display of Information: In terms of user roles, and sensitive information that could lead to a data breach,
General Users can only see their own profile and limited admin info,  while admins can see everything including usernames
and passwords.

NavBar: Once a user is logged in, their name and last name will show in their nav, and the drop-down menu changes positions
with a media query to prevent it from not showing on page.

Architecture Decisions:
Users are stored as instances of a User class, which keeps card generation and role logic simpler and done in one place.

The makeCard() method assigns button classes and class styles based on the user's current role,
which made the promote/remove access hybrid button straightforward to incorporate in design.

Object.freeze() is applied to baseUsers to protect the original data from being modified (enables undo and logout resets
functional).

Card rendering is split into 4 functions: displayMyCard, displayAdminCards,  renderCards, displayCardForStaffs
Each with a unique responsibilities.

Login validation uses regex to enforce format rules before checking users data list; with asterisk error indicators
and placeholder messages that reset on each attempt.

Then the user is matched on the baseUsers array and with the .find() function and conditional ""&&" that first looks for
the userName and then password,and if its successful, then the all the cards render.


Learnings and Challenges:

The biggest challenge was managing re-renders and the logic of display information and buttons. I found out at the end
it was easier to divide the pieces into clear parts, and helper functions so I could manipulate "one thing at a time".
Another challenge was finding bugs once something else was fixed, and just a single line could fix. For example, not
 clearing my divs where the cards were displayed in every time, and it took one line to clear them.

Overall this project pushed me to think carefully about separation of responsibilities and how small structural decisions
early on make the rest of the logic much cleaner to build.


