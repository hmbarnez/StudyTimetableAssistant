<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a id="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
<!--
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]
-->


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/github_username/repo_name">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">STUDY TIMETABLE ASSISTANT</h3>

  <p align="center">
    Study Timetable Assistant is an intuitive app designed to help students manage their academic 
    schedules by allowing them to add exams, classes, and tasks, 
    and receive timely notifications based on their activities and account type.
    <br />
    <br />
<!--     <a href="https://github.com/hmbarnez/StudyTimetableAssistant.git">View Demo</a> -->
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

<!--'Here's a blank template to get started: To avoid retyping too much info. Do a search and replace with your text editor for the following: `github_username`, `repo_name`, `twitter_handle`, `linkedin_username`, `email_client`, `email`, `project_title`, `project_description`-->
Study Timetable Assistant is an application tailored to meet the needs of students managing their academic lives. Designed to enhance organization and efficiency, this app allows students to effectively structure their academic schedules by adding exams, classes, and tasks to a personalized timetable.

The core functionality revolves around its dynamic scheduling capabilities, which not only display a well-organized timetable but also provide customized notifications. These notifications alert users about upcoming academic activities, helping them stay prepared and on track. Additionally, there's a feature allows users to set a weekly study time goal during the initial account setup. As students log their study sessions, the app automatically subtracts the time spent from their weekly goal and provides progress updates. If the weekly study hours are not met, the app sends random notifications encouraging users to study, ensuring they stay on track with their academic objectives.

One of the unique features of the Study Timetable Assistant is the initial setup process, where users create an account and answer a series of questions. These questions are designed to ascertain the user's specific needs and preferences, which then determines the type of account they receive. Depending on the account type, notification settings are tailored, ensuring that each student receives reminders in a manner that best supports their academic success.

This project leverages modern software architecture and user-centric design to offer a seamless and interactive experience, making academic management more intuitive and less burdensome for students worldwide.
<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![Nest][Nest.js]][Nest-url]
* [![React Native][React-Native.js]][React-Native-url]
* [![Expo][Expo]][Expo-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started
To get a local copy up and running follow these simple example steps.

### Prerequisites
- Node.js: Install Node.js, which is required to run the Nest.js backend. You can download it from Node.js official website.
- Nest.js: After installing Node.js, install the Nest.js CLI globally using npm:
   ```sh
  npm i -g @nestjs/cli
  ```
- Expo CLI: The Expo CLI is required to serve and test the frontend. Install it globally using npm:
  ```sh
  npm install npm@latest -g
  ```
- Firebase Account: Since Firestore is used as the database, a Firebase account is necessary. Sign up or log in at Firebase and set up a Firestore database.
- Firebase CLI 
  ```sh
  npm install -g firebase-tools
  ```
- Environment Variables: Set up necessary environment variables for both the backend and frontend. For the backend, you'll need to configure access to Firestore and potentially other Firebase services. For the frontend, ensure the API URLs and any other necessary config are properly set.
- IDE/Code Editor: A suitable IDE or code editor such as Visual Studio Code, which can be downloaded from Visual Studio Code, to write and manage your code effectively.
### Installation
1. Clone the repo
   ```sh
   https://github.com/hmbarnez/StudyTimetableAssistant.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Download .env file and add it to the frontend.
4. Download serviceAccountKey.json file and add it to the backend-->src
<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage
To begin using the Study Timetable Assistant, follow these steps:

Create an Account:

Visit the app's homepage and sign up for a new account by providing your email and creating a password.

Determine Your Account Type:

Upon account creation, you will be prompted to answer a series of questions related to your study habits, preferences, and typical schedule.
Your responses will help the app determine the type of account that best fits your needs, customizing the notification system to match your personal academic requirements.<br/>

Adding Activities

Add Exams, Classes, and Tasks:

To add an activity, navigate to the 'Add Activity' section via the app’s menu.
Select the type of activity (exam, class, or task) and fill in the necessary details such as the subject, date, time, and any additional notes.
Save the activity, and it will automatically be added to your timetable.<br/>

Viewing Your Schedule

Your personalized schedule can be viewed by selecting the home button or calendar button at the bottom of the screen.
Here, you'll see all your scheduled activities organized by date and time, providing a clear overview of your upcoming commitments.

Notifications

Manage Notifications:
Notifications are set up automatically based on the preferences established during the account setup process.
You can adjust notification settings at any time by going to the 'Settings' menu and changing your account type.

By following these steps, you can maximize your productivity and ensure that you never miss an important academic event. The Study Timetable Assistant is designed to make your study experience as organized and efficient as possible.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

Coming Soon...

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Coming Soon...

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Top contributors:
  <a href="https://github.com/aadams36">  Hafiz Adams
</a>

 <a href="https://github.com/hmbarnez">  Harrison Barnes
</a>

 <a href="https://github.com/khoatran3005">  Khoa Tran
</a>

 <a href="https://github.com/MukeCelestino"> Muketoi Celestino
</a>

<!--
<a href="https://github.com/github_username/repo_name/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=github_username/repo_name" alt="contrib.rocks image" />
</a>
-->


<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

 - studyplannerappggc@gmail.com

Project Link: [https://github.com/hmbarnez/StudyTimetableAssistant.git]([https://github.com/github_username/repo_name](https://github.com/hmbarnez/StudyTimetableAssistant.git))

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo_name/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/appscreen.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[Nest.js]: https://img.shields.io/badge/NestJS-e0234e?style=for-the-badge&logo=nestjs&logoColor=white
[Nest-url]: https://nestjs.com/
[Expo]: https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white
[Expo-url]: https://expo.dev/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[React-Native.js]: https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-Native-url]: https://reactnative.dev/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
