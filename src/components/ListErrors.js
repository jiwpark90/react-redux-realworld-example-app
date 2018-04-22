import React from 'react';

class ListErrors extends React.Component {
    render() {
        const { errors } = this.props;
        if (errors) {
            return (
                <ul className="error-messages">
                    {
                        Object.keys(errors).map((key) => {
                            let details = "";
                            const showNums = errors[key].length > 1;
                            errors[key].map((detail, idx) => {
                                details += ` ${showNums ? `(${idx + 1}) ` : '' }${detail}`;
                            })
                            return (
                                <li key="key">
                                    {key}:{details}
                                </li>
                            );
                        })
                    }
                </ul>
            );
        }
        return null;
    }
}

export default ListErrors;