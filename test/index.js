const { Builder, until, WebDriver } = require('selenium-webdriver');
const fs = require('fs');
const assert = require('assert');

const UserSearchPage = require('./UserSearchPage');
const UserUpdatePage = require('./UserUpdatePage');

WebDriver.prototype.saveScreenshot = function(filename) {
    return this.takeScreenshot().then(function(data) {
        return new Promise((resolve, reject) => {
            fs.writeFile(filename, data.replace(/^data:image\/png;base64,/,''), 'base64', function(err) {
                err ? reject(err) : resolve();
            });
        });
    });
};

describe('User search page', function() {

    this.timeout(10000);

    before(async function() {
        this.driver = new Builder().forBrowser('chrome').usingServer('http://selenium:4444/wd/hub').build();
        this.page = new UserSearchPage(this.driver);
        await this.page.open();
        await this.driver.wait(until.elementLocated(this.page.$prev));
    });

    after(function() {
        this.driver.quit();
    });

    it('should show 20 users', async function() {
        const userCount = await this.page.countUsers();
        assert.equal(userCount, 20);
    });

    it('should paginate', async function() {
        const firstPageUserIds = await this.page.getUserIds();
        await this.page.goNext();
        const secondPageUserIds = await this.page.getUserIds();
        await this.page.goPrev();
        assert.deepEqual(await this.page.getUserIds(), firstPageUserIds);
        await this.page.goNext();
        assert.deepEqual(await this.page.getUserIds(), secondPageUserIds);
    });

});

describe('User update page', function() {

    this.timeout(10000);

    before(async function() {
        this.driver = new Builder().forBrowser('chrome').usingServer('http://selenium:4444/wd/hub').build();
        this.page = new UserUpdatePage(this.driver);
        await this.page.open();
        await this.page.ready();
    });

    after(function() {
        this.driver.quit();
    });

    it('should edit user', async function() {
        const newName = 'John Doe'
        await this.page.startEdit()
        await this.page.setName(newName)
        await this.page.update()
        await this.driver.navigate().refresh();
        await this.page.open();
        await this.page.ready();
        const name = await this.page.getName()
        assert.equal(name, newName)
    });

});