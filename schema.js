const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
} = require('graphql');
const fetch = require('node-fetch');

const departmentDataUrl =
  'https://www.data.gouv.fr/fr/datasets/r/63352e38-d353-4b54-bfd1-f1b3ee1cabd7';
const ageDataUrl =
  'https://www.data.gouv.fr/fr/datasets/r/08c18e08-6780-452d-9b8c-ae244ad529b3';

// define the different types
const DepartmentType = new GraphQLObjectType({
  name: 'Department',
  fields: () => ({
    department_number: { type: GraphQLID },
    date: { type: GraphQLString },
    hosp: { type: GraphQLInt },
    rea: { type: GraphQLInt },
    rad: { type: GraphQLInt },
    dc: { type: GraphQLInt },
  }),
});

const GenderType = new GraphQLObjectType({
  name: 'Gender',
  fields: () => ({
    department_number: { type: GraphQLID },
    gender: { type: GraphQLInt },
    date: { type: GraphQLString },
    hosp: { type: GraphQLInt },
    rea: { type: GraphQLInt },
    rad: { type: GraphQLInt },
    dc: { type: GraphQLInt },
  }),
});

const AgeType = new GraphQLObjectType({
  name: 'Age',
  fields: () => ({
    date: { type: GraphQLString },
    age: { type: GraphQLInt },
    hosp: { type: GraphQLInt },
    rea: { type: GraphQLInt },
    rad: { type: GraphQLInt },
    dc: { type: GraphQLInt },
    department: {
      type: DepartmentType,
      args: { department_number: { type: GraphQLID } },
      resolve(parent, args) {
        const id = args.department_number;
        return fetch(ageDataUrl).then((res) => res.text());
      },
    },
  }),
});

// Root query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    departments: {
      type: new GraphQLList(DepartmentType),
      resolve(parent, args) {
        return fetch(departmentDataUrl)
          .then((res) => res.text())
          .then((data) => {
            let dataSet = [];
            data.split('\r\n').map((line) => {
              let newEntry = {};
              const entry = line.split(';');
              if (
                entry[0] &&
                entry[0] !== '"dep"' &&
                parseInt(entry[1].replace(/"/g, '')) === 0
              ) {
                newEntry.department_number = entry[0].replace(/"/g, '');
                newEntry.date = entry[2].replace(/"/g, '');
                if (
                  parseInt(entry[3].replace(/"/g, '')) ||
                  parseInt(entry[3].replace(/"/g, '')) == 0
                )
                  newEntry.hosp = parseInt(entry[3].replace(/"/g, ''));
                if (
                  parseInt(entry[4].replace(/"/g, '')) ||
                  parseInt(entry[4].replace(/"/g, '')) == 0
                )
                  newEntry.rea = parseInt(entry[4].replace(/"/g, ''));
                if (
                  parseInt(entry[5].replace(/"/g, '')) ||
                  parseInt(entry[5].replace(/"/g, '')) == 0
                )
                  newEntry.rad = parseInt(entry[5].replace(/"/g, ''));
                if (
                  parseInt(entry[6].replace(/"/g, '')) ||
                  parseInt(entry[6].replace(/"/g, '')) == 0
                )
                  newEntry.dc = parseInt(entry[6].replace(/"/g, ''));

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
        return fetch(departmentDataUrl)
          .then((res) => res.text())
          .then((data) => {
            let dataSet = [];
            let newData = data.split('\r\n');
            newData.map((line) => {
              let newEntry = {};
              const entry = line.split(';');
              if (
                entry[0] &&
                entry[0].replace(/"/g, '') === id &&
                parseInt(entry[1].replace(/"/g, '')) === 0 // total of both men and women
              ) {
                newEntry.department_number = id;
                newEntry.date = entry[2].replace(/"/g, '');
                if (
                  parseInt(entry[3].replace(/"/g, '')) ||
                  parseInt(entry[3].replace(/"/g, '')) == 0
                )
                  newEntry.hosp = parseInt(entry[3].replace(/"/g, ''));
                if (
                  parseInt(entry[4].replace(/"/g, '')) ||
                  parseInt(entry[4].replace(/"/g, '')) == 0
                )
                  newEntry.rea = parseInt(entry[4].replace(/"/g, ''));
                if (
                  parseInt(entry[5].replace(/"/g, '')) ||
                  parseInt(entry[5].replace(/"/g, '')) == 0
                )
                  newEntry.rad = parseInt(entry[5].replace(/"/g, ''));
                if (
                  parseInt(entry[6].replace(/"/g, '')) ||
                  parseInt(entry[6].replace(/"/g, '')) == 0
                )
                  newEntry.dc = parseInt(entry[6].replace(/"/g, ''));

                dataSet.push(newEntry);
              }
            });
            return dataSet;
          });
      },
    },
    age: {
      type: new GraphQLList(AgeType),
      args: { age: { type: GraphQLInt } },
      resolve(parent, args) {
        return fetch(ageDataUrl)
          .then((res) => res.text())
          .then((data) => {
            let dataSet = [];
            data.split('\r\n').map((line) => {
              let newEntry = {};
              const entry = line.split(';');
              if (entry[0] && entry[0] !== '"dep"' && entry[1]) {
                newEntry.department_number = entry[0].replace(/"/g, '');
                newEntry.date = entry[2].replace(/"/g, '');
                if (
                  parseInt(entry[1].replace(/"/g, '')) ||
                  parseInt(entry[1].replace(/"/g, '')) == 0
                )
                  newEntry.gender = parseInt(entry[1].replace(/"/g, ''));
                if (
                  parseInt(entry[3].replace(/"/g, '')) ||
                  parseInt(entry[3].replace(/"/g, '')) == 0
                )
                  newEntry.hosp = parseInt(entry[3].replace(/"/g, ''));
                if (
                  parseInt(entry[4].replace(/"/g, '')) ||
                  parseInt(entry[4].replace(/"/g, '')) == 0
                )
                  newEntry.rea = parseInt(entry[4].replace(/"/g, ''));
                if (
                  parseInt(entry[5].replace(/"/g, '')) ||
                  parseInt(entry[5].replace(/"/g, '')) == 0
                )
                  newEntry.rad = parseInt(entry[5].replace(/"/g, ''));
                if (
                  parseInt(entry[6].replace(/"/g, '')) ||
                  parseInt(entry[6].replace(/"/g, '')) == 0
                )
                  newEntry.dc = parseInt(entry[6].replace(/"/g, ''));

                dataSet.push(newEntry);
              }
            });
            return dataSet;
          });
      },
    },
    date: {
      type: new GraphQLList(AgeType),
      args: { date: { type: GraphQLString } },
      resolve(parent, args) {
        return fetch(ageDataUrl)
          .then((res) => res.text())
          .then((data) => {
            let dataSet = [];
            data.split('\r\n').map((line) => {
              let newEntry = {};
              const entry = line.split(';');
              if (entry[0] && entry[0] !== '"dep"' && entry[1]) {
                newEntry.department_number = entry[0].replace(/"/g, '');
                newEntry.date = entry[2].replace(/"/g, '');
                if (
                  parseInt(entry[1].replace(/"/g, '')) ||
                  parseInt(entry[1].replace(/"/g, '')) == 0
                )
                  newEntry.gender = parseInt(entry[1].replace(/"/g, ''));
                if (
                  parseInt(entry[3].replace(/"/g, '')) ||
                  parseInt(entry[3].replace(/"/g, '')) == 0
                )
                  newEntry.hosp = parseInt(entry[3].replace(/"/g, ''));
                if (
                  parseInt(entry[4].replace(/"/g, '')) ||
                  parseInt(entry[4].replace(/"/g, '')) == 0
                )
                  newEntry.rea = parseInt(entry[4].replace(/"/g, ''));
                if (
                  parseInt(entry[5].replace(/"/g, '')) ||
                  parseInt(entry[5].replace(/"/g, '')) == 0
                )
                  newEntry.rad = parseInt(entry[5].replace(/"/g, ''));
                if (
                  parseInt(entry[6].replace(/"/g, '')) ||
                  parseInt(entry[6].replace(/"/g, '')) == 0
                )
                  newEntry.dc = parseInt(entry[6].replace(/"/g, ''));

                dataSet.push(newEntry);
              }
            });
            return dataSet;
          });
      },
    },
    gender: {
      type: new GraphQLList(GenderType),
      args: { gender: { type: GraphQLInt } },
      resolve(parent, args) {
        const gender = args.gender;
        return fetch(departmentDataUrl)
          .then((res) => res.text())
          .then((data) => {
            let dataSet = [];
            data.split('\r\n').map((line) => {
              let newEntry = {};
              const entry = line.split(';');
              if (entry[0] && entry[0] !== '"dep"' && entry[1]) {
                newEntry.department_number = entry[0].replace(/"/g, '');
                newEntry.date = entry[2].replace(/"/g, '');
                if (
                  parseInt(entry[1].replace(/"/g, '')) ||
                  parseInt(entry[1].replace(/"/g, '')) == 0
                )
                  newEntry.gender = parseInt(entry[1].replace(/"/g, ''));
                if (
                  parseInt(entry[3].replace(/"/g, '')) ||
                  parseInt(entry[3].replace(/"/g, '')) == 0
                )
                  newEntry.hosp = parseInt(entry[3].replace(/"/g, ''));
                if (
                  parseInt(entry[4].replace(/"/g, '')) ||
                  parseInt(entry[4].replace(/"/g, '')) == 0
                )
                  newEntry.rea = parseInt(entry[4].replace(/"/g, ''));
                if (
                  parseInt(entry[5].replace(/"/g, '')) ||
                  parseInt(entry[5].replace(/"/g, '')) == 0
                )
                  newEntry.rad = parseInt(entry[5].replace(/"/g, ''));
                if (
                  parseInt(entry[6].replace(/"/g, '')) ||
                  parseInt(entry[6].replace(/"/g, '')) == 0
                )
                  newEntry.dc = parseInt(entry[6].replace(/"/g, ''));

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
