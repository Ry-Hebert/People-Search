import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
    searchField: {
        width: '100%',
        margin: "1rem 0rem 2rem",
    },
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    secondaryInfo: {
        display: 'grid',
        justifyContent: 'end',
        textAlign: 'right',
    },
    searchContent: {
        width:  '100%',
    },
}));

// export class SearchData extends Component {
//   static displayName = SearchData.name;

const SearchData = () => {
    const classes = useStyles()
    // Setup of state to handle People Data Results
    const [peopleData, setPeopleData] = useState({ dataRes: [null], loading: true })
    const [searchData, setSearchData] = useState({ dataRes: [null], loading: true })

    const search = (arr, s) => {
        console.log('In Search')
        console.log(arr)
        console.log(s)
        
        const doesContain = (item) =>{
            let noPicture = {name: item.name, address: item.address, age: item.age, interests: item.interests}
            let getValues = Object.values(noPicture)
            let check = getValues.toString().toLowerCase()
            check = check.replace(/[^a-zA-Z0-9]/g, "")
            console.log(check)
            console.log(s.toLowerCase().replace(/[^a-zA-Z0-9]/g, ""))
            console.log(check.includes(s.toLowerCase().replace(/[^a-zA-Z0-9]/g, "")))
            return check.includes(s.toLowerCase().replace(/[^a-zA-Z0-9]/g, ""))
        }
        
        let matches = arr.filter(doesContain)

        console.log(matches)
        return matches
    };

    const populatePeopleData = async () => {
        const response = await fetch('peoplesearch')
        const data = await response.json()
        setPeopleData({ dataRes: data, loading: false })
    }

    const searchFilterPeople = (event) => {
        let data = search(peopleData.dataRes, event.target.value)
        console.log("Search Return: ")
        console.log(data)
        setSearchData({ dataRes: data, loading: false })
    }

    useEffect(()=>{populatePeopleData()}, [1])

    const renderPeopleListTable = (peopleList) => {
        return (
          <List className={classes.root}>
              {peopleList.map(people =>
                <ListItem key={people.name} divider='true'>
                  <ListItemAvatar>
                      <Avatar src={people.image} variant='circle' />
                  </ListItemAvatar>
                  <ListItemText primary={people.name} secondary={people.address} secondaryTypographyProps={{ noWrap: false }}></ListItemText>
                  <ListItemText className={classes.secondaryInfo} primary={"Age: " + people.age} secondary={people.interests}></ListItemText>
                </ListItem>
              )}
          </List>
        );
      }

    console.log(peopleData)
    console.log(searchData)
    let contents = peopleData.loading ? <p><em>Loading...</em></p> : searchData.loading ? renderPeopleListTable(peopleData.dataRes) : renderPeopleListTable(searchData.dataRes);

    return (
        <div className={classes.searchContent}>
            <TextField className={classes.searchField} id='hcSearchField' label='Search' variant='outlined' onChange={searchFilterPeople}></TextField>
            {contents}
        </div>
    );
}

export default SearchData