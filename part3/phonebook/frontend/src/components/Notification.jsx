import PropTypes from 'prop-types';

export const Notification = ({ notification }) => {
    if (notification === null)
        return null;

    let style = {};
    if (notification.type === 'error') 
        style = {
            color: 'red',
            background: 'lightgrey',
            fontSize: 20,
            borderStyle: 'solid',
            borderRadius: 5,
            padding: 10,
            marginBottom: 10
        };
    else if (notification.type === 'success')
        style = {
            color: 'green',
            background: 'lightgrey',
            fontSize: 20,
            borderStyle: 'solid',
            borderRadius: 5,
            padding: 10,
            marginBottom: 10
        };

    return <div style={style}>{notification.message}</div>;
};

Notification.propTypes = {
    notification: PropTypes.shape({
        type: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired
    })
};