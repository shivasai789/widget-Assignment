import './index.css';

const TabButtons = (props) => {
    const { details, activeTabId, onClickChangeTab } = props;
    const { name, id } = details;

    // Determine the button's CSS class based on whether it is the active tab
    const classes = activeTabId === id ? 'tab-btns btn-selected' : 'tab-btns';

    // Handle tab click by calling the parent function with the tab's id
    const onChangeTab = () => {
        onClickChangeTab(id);
    };

    return (
        <button type="button" className={classes} onClick={onChangeTab}>
            {name}
        </button>
    );
};

export default TabButtons;
