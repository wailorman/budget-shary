describe("Example client unit test", ()=> {

    it(`should find chai`, () => {

        expect(true).to.eql(true);

    });

    it(`should find lodash`, () => {

        expect(_.pick).to.exist;

    });

    it(`should find Q`, () => {

        expect(Q).to.exist;
        expect(Q.defer).to.exist;

    });

});