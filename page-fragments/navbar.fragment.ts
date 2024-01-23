import {expect, Locator, Page} from '@playwright/test'

export class NavBarFragment {
    readonly page: Page
    readonly navbarLink: Locator
    readonly logo: Locator

    constructor(page: Page) {
        this.page = page
        this.navbarLink = page.locator('.link--nav-heading')
        this.logo = page.locator('.douglas-logo__image')
    }

    public async navigateToSection(sectionName: string) {
        await this.navbarLink.filter({hasText: sectionName}).waitFor({ state: 'visible', timeout: 5000 });
        await this.navbarLink.filter({hasText: sectionName}).click();
        await this.page.waitForURL('**/de/c/' + sectionName.toLowerCase() + '/**', {timeout: 5000});
        await this.logo.hover();
    }
}
