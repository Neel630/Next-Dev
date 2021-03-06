import React from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

const ProfileExperience = ({
  experience: { company, title, location, to, from, description },
}) => {
  return (
    <div>
      <h3 className='text-dark'>{company}</h3>

      <p>
        <Moment format='YYYY/MM/DD'>{from}</Moment> -{' '}
        {!to ? 'Now' : <Moment format='YYYY/MM/DD'>{to}</Moment>}
      </p>
      <p>
        <strong>Postition: </strong>
        {title}
      </p>

      <p>
        <strong>Description: </strong>
        {description}
      </p>
      <p>
        <strong>Location: </strong>
        {location}
      </p>
    </div>
  );
};

ProfileExperience.propTypes = {
  experience: PropTypes.array.isRequired,
};

export default ProfileExperience;
