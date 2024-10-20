describe("S2", () => {

    it("should create a portal link", () => {
        const pinfo: PortalInfo =
        {
            guid: "guid",
            name: "myname",
            description: "",
            position: L.latLng(1, 1)
        }

        const link = UiHelper.getPortalLink(pinfo) as HTMLAnchorElement;
        expect(link.tagName).toBe("A"); // is a link
        expect(link.textContent).toBe("myname"); // got portal name
        expect(link.href.length).toBeGreaterThan(0); // has a link
    });


    it("should find a OP portal near pos", () => {

        createOP();
        const portal = UiHelper.findPortalNearPos(L.latLng(1, 1), Infinity);

        expect(portal).not.toBeDefined();
    });


    it("should convert distance to string", () => {

        expect(UiHelper.formatDistance(1.2)).toBe("1.2m");
        expect(UiHelper.formatDistance(500.4)).toBe("500m");
        expect(UiHelper.formatDistance(1500)).toBe("1.5km");
        expect(UiHelper.formatDistance(123456)).toBe("123km");
    });

})


