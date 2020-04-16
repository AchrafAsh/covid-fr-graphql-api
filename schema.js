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

const departmentsData = [
  { department_number: 1, hosp: 10, rea: 0, rad: 0, dc: 0 },
  { department_number: 2, hosp: 3, rea: 0, rad: 0, dc: 0 },
];

// define the different types
const DepartmentType = new GraphQLObjectType({
  name: 'Department',
  fields: () => ({
    department_number: { type: GraphQLID },
    sexe: { type: GraphQLInt },
    day: { type: GraphQLString },
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
                dataSet.push({
                  department_number: entry[0].replace(/"/g, ''),
                  sexe: parseInt(entry[1]),
                  day: entry[2].replace(/"/g, ''),
                  hosp: parseInt(entry[3]),
                  rea: parseInt(entry[4]),
                  rad: parseInt(entry[5]),
                  dc: parseInt(entry[6]),
                });
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
                dataSet.push({
                  department_number: entry[0].replace(/"/g, ''),
                  sexe: parseInt(entry[1]),
                  day: entry[2].replace(/"/g, ''),
                  hosp: parseInt(entry[3]),
                  rea: parseInt(entry[4]),
                  rad: parseInt(entry[5]),
                  dc: parseInt(entry[6]),
                });
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
