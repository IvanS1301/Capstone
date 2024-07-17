import React, { useState } from 'react';
import { useLeadsContext } from "../../hooks/useLeadsContext";
import { Container, Typography, Box, Paper, Grid, IconButton } from '@mui/material';
import moment from 'moment';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faPhone } from '@fortawesome/free-solid-svg-icons';

const AgentViewForm = ({ unassignedId }) => {
  const { unassignedLeads } = useLeadsContext();
  const [clipboardState, setClipboardState] = useState({
    phone: false,
    email: false,
  });

  // Find the lead with the specified ID
  const lead = unassignedLeads.find(lead => lead._id === unassignedId);

  if (!lead) {
    return <div>Loading...</div>;
  }

  // Format the createdAt and updatedAt date using moment.js
  const formattedCreatedAt = moment(lead.createdAt).format('MMM-D-YYYY h:mm:ss a');
  const formattedUpdatedAt = moment(lead.updatedAt).format('MMM-D-YYYY h:mm:ss a');
  const formattedDistributed = moment(lead.Distributed).format('MMM-D-YYYY h:mm:ss a');

  const handleCopy = (field) => {
    setClipboardState({ ...clipboardState, [field]: true });
    setTimeout(() => setClipboardState({ ...clipboardState, [field]: false }), 2000); // Reset after 2 seconds
  };

  return (
    <Container >
      <Paper elevation={3} 
      sx={{ padding: 0, borderRadius: 5, boxShadow: '1px 1px 5px rgba(0, 0, 0, 0.065)',paddingTop: '0', backgroundColor: '#fff7ed'  }}>
      <Box
      mb={3}
      textAlign="center"
      style={{
        backgroundColor: '#111827',
        padding: '3px',
        borderTopLeftRadius: '6px',
        borderTopRightRadius: '6px',
        marginTop: '4px',
        position: 'relative', // Ensure the Box is relative for absolute positioning
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        style={{
          color: '#e0e0e0',
          borderBottomLeftRadius: '6px',
          borderBottomRightRadius: '6px',
          marginTop: '10px',
          display: 'inline-block',
          fontFamily: 'Century Gothic, sans-serif',
        }}
      >
        {lead.name}
      </Typography>
      <IconButton
        href={`skype:${lead.phonenumber}?call`}
        style={{
          position: 'absolute',
          right: '10px', // Adjust this value to move the icon horizontally
          top: '12px', // Adjust this value to move the icon vertically
          color: 'white',
        }}
      >
        <FontAwesomeIcon icon={faPhone} />
      </IconButton>
    </Box>
        <div>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <Typography variant="body1" component="p" fontSize="20px" 
            style={{ 
              color: '#020617', 
              marginLeft: '30px'}}>
            <span style={{ color: '#020617' }}><strong>Type: </strong></span>{lead.type} </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Box display="flex" alignItems="center">
            <Typography variant="body1" component="p" fontSize="20px" style={{ color: '#020617', marginLeft: '30px', }}>
            <span style={{ color: '#020617' }}><strong>Phone Number: </strong></span>{lead.phonenumber} </Typography>
              <CopyToClipboard text={lead.phonenumber} onCopy={() => handleCopy('phone')}>
                <button style={{ marginLeft: '10px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', color: '#020617', fontSize: '20px' }}>
                  <FontAwesomeIcon icon={faCopy} />
                </button>
              </CopyToClipboard>
              {clipboardState.phone && (
                <Typography variant="body1" component="p" fontSize="20px" style={{ color: 'green', marginLeft: '10px' }}>
                  copied to clipboard
                </Typography>
              )}
            </Box>
            
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography variant="body1" component="p" fontSize="20px" style={{ color: '#020617', marginLeft: '30px', }}>
            <span style={{ color: '#020617' }}><strong>Address: </strong></span>{lead.streetaddress} {lead.city} {lead.postcode}</Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
          <Box display="flex" alignItems="center">
            <Typography variant="body1" component="p" fontSize="20px" style={{ color: '#020617', marginLeft: '30px', }}>
            <span style={{ color: '#020617' }}><strong>Email Address: </strong></span>{lead.emailaddress}</Typography>
              <CopyToClipboard text={lead.emailaddress}onCopy={() => handleCopy('email')}>
                <button style={{ 
                  marginLeft: '10px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', color: '#020617', fontSize: '20px' }}>
                  <FontAwesomeIcon icon={faCopy} />
                </button>
              </CopyToClipboard>
              {clipboardState.email && (
                <Typography variant="body1" component="p" fontSize="20px" style={{ color: 'green', marginLeft: '10px' }}>
                  copied to clipboard
                </Typography>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography variant="body1" component="p" fontSize="20px" style={{ color: '#020617', marginLeft: '30px', }}>
            <span style={{ color: '#020617' }}><strong>Call Disposition: </strong></span>{lead.callDisposition}</Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography variant="body1" component="p" fontSize="20px" style={{ color: '#020617', marginLeft: '30px', }}>
            <span style={{ color: '#020617' }}><strong>Remarks: </strong></span>{lead.remarks}</Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography variant="body1" component="p" fontSize="20px" style={{ color: '#020617', marginLeft: '30px' }}>
            <span style={{ color: '#020617' }}><strong>Lead Gen Date: </strong></span>{formattedCreatedAt}</Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography variant="body1" component="p" fontSize="20px" style={{ color: '#020617', marginLeft: '30px'}}>
            <span style={{ color: '#020617' }}><strong>Distributed: </strong></span>{formattedDistributed}</Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography 
              variant="body1" 
              component="p" 
              fontSize="20px" 
              style={{ 
                color: '#020617', 
                marginLeft: '30px',  // Add your desired left margin here
              }}>
              <span style={{ color: '#020617' }}>
                <strong>Last Touch: </strong>
              </span>
              {formattedUpdatedAt}
            </Typography>
          </Grid>

          
          
        
          {/* <IconButton 
            href={`skype:${lead.phonenumber}?call`} 
            style={{ marginLeft: '10px', color: '#020617' }}>
            <FontAwesomeIcon icon={faPhone} />
          </IconButton> */}
        </Grid>
        </div>
        <br/>
        <br/>
      </Paper>
    </Container>
  );
};

export default AgentViewForm;
