import {expect, Locator, Page} from '@playwright/test'

export class CookieModalFragment {
    readonly page: Page
    readonly allowAllCookiesButton: Locator
    readonly allowOnlyStriclyRequiredCookiesButton: Locator

    constructor(page: Page) {
        this.page = page
        this.allowAllCookiesButton = page.locator('.uc-list-button__accept-all')
        this.allowOnlyStriclyRequiredCookiesButton = page.locator('.uc-list-button__deny-all')
    }

    public async allowAllCookies() {
        await this.allowAllCookiesButton.waitFor({ state: 'visible', timeout: 5000 });
        await this.allowAllCookiesButton.click();
    }

    public async allowOnlyStriclyRequiredCookies() {
        await this.allowOnlyStriclyRequiredCookiesButton.waitFor({ state: 'visible', timeout: 5000 });
        await this.allowOnlyStriclyRequiredCookiesButton.click();
    }
}
