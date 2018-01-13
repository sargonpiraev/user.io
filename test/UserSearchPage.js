var {Builder, By, until, WebDriver, Key} = require('selenium-webdriver');

module.exports = class UserSearchPage {

    constructor (driver) {
        this.driver = driver

        this.$prev = By.id('prev')
        this.$next = By.id('next')
        this.$user = By.className('user')
    }

    open () {
        return this.driver.get('http://client:8080/')
    }

    async getUserIds () {
        const users = await this.driver.findElements(this.$user)
        const userDescriptions = await Promise.all(users.map(user => user.findElement(By.className('description')).getText()))
        return userDescriptions.map(userDescription => userDescription.replace('ID: ', ''))
    }

    async countUsers () {
        const users = await this.driver.findElements(this.$user)
        return users.length
    }

    goNext () {
        return this.driver.findElement(this.$next).click()
    }

    goPrev () {
        return this.driver.findElement(this.$prev).click()
    }


}