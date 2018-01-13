var {Builder, By, until, WebDriver, Key} = require('selenium-webdriver');


const PENCIL = By.className('pencil')
const INPUT = By.css('input')
const SAVE_BTN = By.css('button')
const NAME = By.id('name')

module.exports = class UserSearchPage {

    constructor (driver) {
        this.driver = driver
    }

    open () {
        return this.driver.get('http://client:8080/#/user/1')
    }

    async startEdit () {
        await this.driver.findElement(PENCIL).click()
        return this.driver.wait(until.elementLocated(INPUT))
    }

    getName () {
        return this.driver.findElement(NAME).getText()
    }

    async setName (newName) {
        await this.driver.findElement(INPUT).clear()
        await this.driver.findElement(INPUT).sendKeys(newName)
    }

    update () {
        return this.driver.findElement(SAVE_BTN).click()
    }

    ready () {
        return this.driver.wait(until.elementLocated(NAME));
    }

}