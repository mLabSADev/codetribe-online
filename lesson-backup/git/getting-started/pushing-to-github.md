---
title: Pushing to GitHub
date: 2021-01-07
chapter: 3
lesson: 3
---

## Step 1

After you have logged into your github account. You should see a screen similar to the screen below. If not then go to the top right section of your screen, click on the last dropdown. Select "Your Profile". This will be where you are able to see all the repositories you created.

![GitHub Profile](images\github-profile.png)

Now to create your repository, simply click on the add icon on the top right corner then select "New Repository". You should see a screen similar to the one below.

![Create a new repo](images\github-create-new-repo.png)

The repository name field(Always Required) is where you will set the name of your repository. For this scenario we will name our repository as "MyFirstRepo". In the description input enter "My first repo". Refer to the screenshot below.

![repo-name](images\repo-name.png)

Now simply click on the "Create repository" button. Congratulations, you have created your first github repo(repository). In this scenario, we have no need to create the readme file. The screen you should see now should be like the one below.

![Repo Created](images\repo-created.png)

We will now go back to our terminal and make our first upload(git push).

## Step 2

Before we can push anything to github using git, we need to create something we can push. On your workstation's(your computer/laptop) desktop screen create a folder called **CodeTribe.** We will use this folder to keep all the projects we will create at CodeTribe.

Create a folder called **myRep**o inside the **CodeTribe** folder. Navigate into the folder. Create a new file and save it as "test"**.** Save the file as a .txt file.

## Step 3

Open your terminal(Your CMD on your windows machine). Now we will navigate all to the **myRepo** folder using the cd command. If you refer back to the "**Commonly Used Terminal Commands",** you will notice we spoke about the cd command. Make sure to type the commands just like the screenshot below.

![Change Directory](images\terminal-change-directory.png)

If you have a look at the screenshots above, you will notice that cd helps navigate us to the desktop screen. On your operating system the desktop is a folder which has all the files you have on your desktop. Screen. 

Therefore, having used the cd command, we have navigated to the desktop folder. The next step is to navigate to the **CodeTribe** folder then finally to the **myRepo** folder.

## Step 4

Please refer back to your github website. We will now enter the commands shown by the github screen. Refer back to the final screenshot of Step 1. Just make sure to replace the git add README.md With git add . (This command is used to tell git to go do a 'track' for all available files and folders within **myRepo** folder). Please do not forget to add the . after the git add .(The full stop means all when using git).

Refer to the screenshot below and you will see how a successful push request looks like.

![Terminal 1](images\terminal-1.png)

If you reload your github page, you should see your test.txt file. Refer to the screenshot below.

![Repo Pushed](images\repo-pushed.png)

We now need to perform a pull request. Why may you ask? Picture this; You have a friend in China. You are both collaborating on a project. Your friend makes changes that you need so therefore he makes a push to the project so to upload all the features he has built. Instead of him sending the project files or the source code for you to join for you, git will do that on your behalf. You simply perform a pull request and all the changes your friend made are simply added to your project. Making it easier for you to continue developing.

## Step 5

If you perform a pull request and you get the message below, it means the current version and the one you have on your workstation are the same. Therefore there was nothing that would be pulled.

![Repo Pull Up to date](images\terminal-pull-up-to-date.png)

Refer to the previous screenshot above with the github website that shows your repository . On your github website, click on upload files. You should see a screen like the screenshot below.

Now let us try to do a pull with a repository change. For this case we will manually upload a file to the repository without using git. It is not advised to do that but for this exercise we will.

![GitHub Manually Push](images\github-manually-push.png)

I decided to add an image to manually push. You can pick any file format you want. Make sure it has a name and description. Simply click on the "Commit Changes" button. You then should see what you have 'committed' to github. Refer to the screenshot below.

![GitHub Manually Pushed](images\github-manually-pushed.png)

## Step 6

On your terminal. Simply perform a git pull now. It will then pull(fetch all the latest changes you made to the repository). If you look at the screenshots below you will notice the terminal will show that it has successfully pulled a new file from the github repository. Make sure to open the **MyRepo**. You will also see that the file is now in your folder file.

![Terminal GitHub Pull](images\terminal-pull.png)

![View Pulled Files](images\view-pulled-files.png)

