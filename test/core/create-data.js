import chai from 'chai';
import { Collection } from '../../collection.js';

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
    'email': 'steven.lamb@family.com',
    'likes': [{
        'name': 'Cheese'
    }, {
        'name': 'Wine'
    }]
}];

var FamilyCollection = new Collection(CollectionData);

describe('Collection create data', () => {
    describe('Example data', () => {
        it('all() - Should get all three FamilyCollection values', () => {
            chai.expect(FamilyCollection.all()).to.be.an('array');
            chai.expect(FamilyCollection.all().length).to.equal(3);
        });
    });

    describe('addItem()', () => {
        it('Should have an additional item', () => {
            var Item = FamilyCollection.addItem({
                'forename': 'Joseph',
                'surname': 'Pearson',
                'age': 87,
                'email': 'joseph.pearson@family.com'
            });

            chai.expect(Item).to.be.an('object');
            chai.expect(FamilyCollection.all()).to.be.an('array');
            chai.expect(FamilyCollection.all().length).to.equal(4);
        });

        it('Nested array should also be a collection', () => {
            var Items = FamilyCollection.addItem({
                'forename': 'Joseph',
                'surname': 'Pearson',
                'age': 87,
                'email': 'joseph.pearson@family.com',
                'dislikes': ['cheese'],
                'likes': [{
                    'name': 'Cars'
                }, {
                    'name': 'Coffee'
                }]
            });

            chai.expect(Items.get(4).likes.get(1).name).to.equal('Coffee');
            chai.expect(Items.get(2).likes.get(1).name).to.equal('Wine');
        });
    });

    describe('addItems()', () => {
        it('can add multiple items.', () => {
            var Item = FamilyCollection.addItem([{
                'forename': 'Joseph',
                'surname': 'Pearson',
                'age': 87,
                'email': 'joseph.pearson@family.com'
            }, {
                'forename': 'Bob',
                'surname': 'Wilson',
                'age': 39,
                'email': 'robert.wilson@family.com'
            }]);

            chai.expect(Item).to.be.an('object');
            chai.expect(FamilyCollection.all()).to.be.an('array');
            chai.expect(FamilyCollection.all().length).to.equal(6);
        });
    });
});
