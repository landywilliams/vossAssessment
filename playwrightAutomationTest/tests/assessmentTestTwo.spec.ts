import { test, expect, Browser, Page, Locator } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto("https://www.ultimateqa.com/automation/");
});

test('Verify Title test', async ({ page }) => {
   
    //verify page Title.
    const pageTitle = await page.title();
    console.log("Verify Title : ", pageTitle);
    expect(pageTitle).toEqual('Automation Practice - Ultimate QA');
});

test('Take screenshot test', async ({ page }) => {
    //Take a screenshot of the page
    await page.screenshot({path: 'homepage.png'});
});

test('Test Login automation', async ({ page }) => {
 
    await page.getByRole('link', { name: 'Login automation' }).click();
    await page.getByLabel('Email').fill("leewilliamsmail@gmail.com");
    await page.getByLabel('Password').fill("testtest");
    await page.click('button.button-primary.g-recaptcha');
    await page.waitForTimeout(500);
    await page.click('button.dropdown__toggle-button');
    await page.waitForTimeout(100);
    await page.getByRole('link', { name: 'Sign Out' }).click();

});
  
test('Test Fill out forms', async ({ page }) => {
 
    await page.waitForTimeout(1000);

    //Browse to "Fill out forms" page and complete all forms, followed by submit action
    await page.getByRole('link', { name: 'Fill out forms' }).click();

    const name1:Locator = await page.locator("#et_pb_contact_name_0");
    await name1.fill("Lee test name one");
    const msg1:Locator = await page.locator("#et_pb_contact_message_0");
    await msg1.fill("Lee test message one");
    await page.click('button.et_pb_contact_submit.et_pb_button');//works

    await page.waitForTimeout(2000);

    const name2:Locator = await page.locator("#et_pb_contact_name_1");
    await name2.fill("Lee test name");
    const msg2:Locator = await page.locator("#et_pb_contact_message_1");
    await msg2.fill("Lee test message , second try");

    //Read captcha question
    const captcha_question = await page.locator(".et_pb_contact_captcha_question");

    //Now that we have located the element, we can then display the inner text using innerText method.
    const captcha_question_innerText = await captcha_question.innerText();
    console.log("Captcha question : ", captcha_question_innerText);

    var index1:number = captcha_question_innerText.indexOf("+"); 
    var num1:number = parseInt(captcha_question_innerText.substring(0,index1).trim()); 

    var index2:number = captcha_question_innerText.length; 
    var num2:number = parseInt(captcha_question_innerText.substring((index1 + 1 ), index2).trim()); 

    var captcha:number = 0

    captcha = num1 + num2 
    console.log("captcha : " + captcha);
    const captchaInput = await page.locator(".input.et_pb_contact_captcha");
    await captchaInput.fill(captcha.toString());
    //await page.click('button.et_pb_contact_submit.et_pb_button');//works
    await page.click('xpath=/html/body/div[1]/div/div/div/article/div/div/div/div/div[2]/div[2]/div/div[2]/form/div/button'); // Xpath
});

test('Test Fake Pricing Page', async ({ page }) => {
    //Browse to the "Fake Pricing Page"
    //await page.waitForTimeout(1000);
    await page.getByRole('link', { name: 'Fake Pricing Page' }).click();

    //Purchase the Basic package
    await page.click('xpath=/html/body/div[1]/div/div/div/article/div/div/div/div[1]/div[2]/div[1]/div/div/div/div[4]/a'); // Xpath

});