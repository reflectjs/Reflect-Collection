var assert = require('assert'),
    chai = require('chai'),
    { Collection, PaginatedCollection } = require('../../collection.js');

var CollectionData = [{
    'forename': 'Mary',
    'surname': 'Lamb',
    'age': 45,
    'email': 'mary.lamb@family.com'
}, {
    'forename': 'Lucy',
    'surname': 'Lamb',
    'age': 43,
    'email': 'lucy.lamb@family.com'
}, {
    'forename': 'Steven',
    'surname': 'Lamb',
    'age': 12,
    'email': 'steven.lamb@family.com'
}, {
    'forename': 'Joseph',
    'surname': 'Pearson',
    'age': 87,
    'email': 'joseph.pearson@family.com'
}];

var PaginatedCollection = new PaginatedCollection(CollectionData, 1);

describe('PaginatedCollection pages', function() {
    describe('paginate()', function() {
        it('Set the PaginateCollection size into chunks of 1.', function() {
            chai.expect(PaginatedCollection.all()).to.be.an('array');
            chai.expect(PaginatedCollection.all().length).to.equal(4);
        });

        it('paginate() chunks the data into twos.', function() {
            let pages = PaginatedCollection.paginate(2).all();

            chai.expect(pages).to.be.an('array');
            chai.expect(pages.length).to.equal(2);
        });

        it('paginate() to have a default of 5.', function() {
            let pages = PaginatedCollection.paginate(0).all();

            chai.expect(pages).to.be.an('array');
            chai.expect(pages.length).to.equal(1);
        });

        it('paginate() accepts strings.', function() {
            let pages = PaginatedCollection.paginate('2').all();

            chai.expect(pages).to.be.an('array');
            chai.expect(pages.length).to.equal(2);
        });
    });

    describe('page()', function() {
        it('Can get the second page.', function() {
            let pages = PaginatedCollection.paginate(2).page(2).all();

            chai.expect(pages).to.be.an('array');
            chai.expect(pages.length).to.equal(2);
        });

        describe('{pages}', function() {
            it('{pages} object exists.', function() {
                PaginatedCollection.paginate(2);

                chai.expect(PaginatedCollection.pages).to.be.an('object');
                chai.expect(PaginatedCollection.pages.current).to.be.a('number');
                chai.expect(PaginatedCollection.pages.next).to.be.a('number');
                chai.expect(PaginatedCollection.pages.previous).to.be.a('number');
                chai.expect(PaginatedCollection.pages.last).to.be.a('number');
                chai.expect(PaginatedCollection.pages.chunks).to.be.a('number');
            });

            it('{pages} is set when getting second page of chunks of 1.', function() {
                // Split into chunks of 1 for testing next.
                PaginatedCollection.paginate(1).page(2);

                chai.expect(PaginatedCollection.pages.current).to.be.a('number');
                chai.expect(PaginatedCollection.pages.current).to.equal(2);
                chai.expect(PaginatedCollection.pages.next).to.be.a('number');
                chai.expect(PaginatedCollection.pages.next).to.equal(3);
                chai.expect(PaginatedCollection.pages.previous).to.be.a('number');
                chai.expect(PaginatedCollection.pages.previous).to.equal(1);
            });

            it('{pages.next} isn\'t greater than allowed.', function() {
                // Split into chunks of 1 for testing next.
                PaginatedCollection.paginate(1);

                chai.expect(PaginatedCollection.pages.next).to.be.a('number');
                chai.expect(PaginatedCollection.pages.next).to.not.equal(5);
            });

            it('{pages.next} isn\'t lower than allowed.', function() {
                // Split into chunks of 1 for testing next.
                PaginatedCollection.paginate(1).page(0);

                chai.expect(PaginatedCollection.pages.current).to.be.a('number');
                chai.expect(PaginatedCollection.pages.current).to.equal(1);
                chai.expect(PaginatedCollection.pages.next).to.be.a('number');
                chai.expect(PaginatedCollection.pages.next).to.equal(2);
                chai.expect(PaginatedCollection.pages.next).to.not.equal(0);
            });
        });
    });

    describe('next()', function() {
        it('{pages.next} is greater.', function() {
            var thePage = PaginatedCollection.paginate(1).page(2);

            chai.expect(thePage.pages.next).to.be.a('number');
            chai.expect(thePage.pages.next).to.equal(3);

            thePage.next();

            chai.expect(thePage.pages.next).to.be.a('number');
            chai.expect(thePage.pages.next).to.equal(4);
        });

        it('{pages.next} is doesn\'t exceed {pages.last}.', function() {
            var thePage = PaginatedCollection.paginate(1).page(4);

            chai.expect(thePage.pages.next).to.be.a('number');
            chai.expect(thePage.pages.next).to.equal(4);

            thePage.next();

            chai.expect(thePage.pages.next).to.not.equal(5);
        });
    });

    describe('previous()', function() {
        it('{pages.previous} is lower.', function() {
            var thePage = PaginatedCollection.paginate(1).page(3);

            chai.expect(thePage.pages.previous).to.be.a('number');
            chai.expect(thePage.pages.previous).to.equal(2);

            thePage.previous();

            chai.expect(thePage.pages.previous).to.be.a('number');
            chai.expect(thePage.pages.previous).to.equal(1);
        });

        it('{pages.previous} is doesn\'t go below 1.', function() {
            var thePage = PaginatedCollection.paginate(1).page(2);

            chai.expect(thePage.pages.previous).to.be.a('number');
            chai.expect(thePage.pages.previous).to.equal(1);

            thePage.previous();

            chai.expect(thePage.pages.previous).to.not.equal(0);
        });
    });
});
