import React from 'react';

const ListPagination = props => {
    if (props.articlesCount <= 10) {
        return null;
    }

    const pages = [];

    // TODO expected to start with 1... starts with 0 though.
    // also puts undefined as the last element
    for (let i = 0; i < Math.ceil(props.articlesCount / 10); ++i) {
        pages.push(i);
    }

    const setPage = page => props.onSetPage(page);
    return (
        <nav>
            <ul className="pagination">
                {
                    // second time seeing this pattern.
                    // other time is through the tags
                    pages.map(p => {
                        const isCurrent = p === props.currentPage;
                        const onClick = event => {
                            event.preventDefault();
                            setPage(p);
                        };

                        return (
                            <li className={isCurrent ? 'page-item active' : 'page-item'}
                                onClick={onClick}
                                key={p.toString()}>
                                <a className="page-link" href="">
                                    { p + 1 }
                                </a>
                            </li>
                        );
                    })
                }
            </ul>
        </nav>
    );
}

export default ListPagination;