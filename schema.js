const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema,
} = require('graphql');
const fetch = require('node-fetch');

const url =
  'https://www.data.gouv.fr/fr/datasets/r/63352e38-d353-4b54-bfd1-f1b3ee1cabd7';

// define the different types
const DepartmentType = new GraphQLObjectType({
  name: 'Department',
  fields: () => ({
    department_number: { type: GraphQLID },
    sexe: { type: GraphQLInt },
    date: { type: GraphQLString },
    hosp: { type: GraphQLInt },
    rea: { type: GraphQLInt },
    rad: { type: GraphQLInt },
    dc: { type: GraphQLInt },
  }),
});

'"dep"', '"sexe"', '"jour"', '"hosp"', '"rea"', '"rad"', '"dc"';

// Root query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    departments: {
      type: new GraphQLList(DepartmentType),
      resolve(parent, args) {
        return fetch(url)
          .then((res) => res.text())
          .then((data) => {
            let dataSet = [];
            newData = data.split('\r\n');
            newData.map((line) => {
              const entry = line.split(';');
              if (entry[0] && entry[0] !== '"dep"' && entry[1]) {
                newEntry = {};
                newEntry.department_number = entry[0].replace(/"/g, '');
                newEntry.date = entry[2].replace(/"/g, '');
                if (
                  parseInt(entry[1].replace(/"/g, '')) ||
                  parseInt(entry[1].replace(/"/g, '')) == 0
                )
                  newEntry.sexe = parseInt(entry[1].replace(/"/g, ''));
                if (
                  parseInt(entry[3].replace(/"/g, '')) ||
                  parseInt(entry[3].replace(/"/g, '')) == 0
                )
                  newEntry.hosp = parseInt(entry[1].replace(/"/g, ''));
                if (
                  parseInt(entry[4].replace(/"/g, '')) ||
                  parseInt(entry[4].replace(/"/g, '')) == 0
                )
                  newEntry.rea = parseInt(entry[1].replace(/"/g, ''));
                if (
                  parseInt(entry[5].replace(/"/g, '')) ||
                  parseInt(entry[5].replace(/"/g, '')) == 0
                )
                  newEntry.rad = parseInt(entry[1].replace(/"/g, ''));
                if (
                  parseInt(entry[6].replace(/"/g, '')) ||
                  parseInt(entry[6].replace(/"/g, '')) == 0
                )
                  newEntry.dc = parseInt(entry[1].replace(/"/g, ''));

                dataSet.push(newEntry);
              }
            });
            return dataSet;
          });
      },
    },
    department: {
      type: new GraphQLList(DepartmentType),
      args: { department_number: { type: GraphQLID } },
      resolve(parent, args) {
        const id = args.department_number;
        return fetch(url)
          .then((res) => res.text())
          .then((data) => {
            let dataSet = [];
            newData = data.split('\r\n');
            newData.map((line) => {
              const entry = line.split(';');
              if (entry[0] && entry[0].replace(/"/g, '') === id) {
                newEntry = {};
                newEntry.department_number = entry[0].replace(/"/g, '');
                newEntry.date = entry[2].replace(/"/g, '');
                if (
                  parseInt(entry[1].replace(/"/g, '')) ||
                  parseInt(entry[1].replace(/"/g, '')) == 0
                )
                  newEntry.sexe = parseInt(entry[1].replace(/"/g, ''));
                if (
                  parseInt(entry[3].replace(/"/g, '')) ||
                  parseInt(entry[3].replace(/"/g, '')) == 0
                )
                  newEntry.hosp = parseInt(entry[1].replace(/"/g, ''));
                if (
                  parseInt(entry[4].replace(/"/g, '')) ||
                  parseInt(entry[4].replace(/"/g, '')) == 0
                )
                  newEntry.rea = parseInt(entry[1].replace(/"/g, ''));
                if (
                  parseInt(entry[5].replace(/"/g, '')) ||
                  parseInt(entry[5].replace(/"/g, '')) == 0
                )
                  newEntry.rad = parseInt(entry[1].replace(/"/g, ''));
                if (
                  parseInt(entry[6].replace(/"/g, '')) ||
                  parseInt(entry[6].replace(/"/g, '')) == 0
                )
                  newEntry.dc = parseInt(entry[1].replace(/"/g, ''));

                dataSet.push(newEntry);
              }
            });
            return dataSet;
          });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
