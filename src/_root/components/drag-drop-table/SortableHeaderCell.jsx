import { useSortable } from '@dnd-kit/sortable';
import PropTypes from 'prop-types';
import { useDragIndex } from './DragAndDropContext';

const dragActiveStyle = (dragState, id) => {
    const { active, over, direction } = dragState;
    let style = {};
    if (active && active === id) {
        style = {
            backgroundColor: 'gray',
            opacity: 0.5,
        };
    } else if (over && id === over && active !== over) {
        style =
            direction === 'right'
                ? {
                    borderRight: '1px dashed gray',
                }
                : {
                    borderLeft: '1px dashed gray',
                };
    }
    return style;
};

const SortableHeaderCell = ({ id, style, ...props }) => {
    const dragState = useDragIndex();
    const { attributes, listeners, setNodeRef, isDragging } = useSortable({
        id,
    });
    const combinedStyle = {
        ...style,
        cursor: 'move',
        ...(isDragging
            ? {
                position: 'relative',
                zIndex: 9999,
                userSelect: 'none',
            }
            : {}),
        ...dragActiveStyle(dragState, id),
    };
    return <th {...props} ref={setNodeRef} style={combinedStyle} {...attributes} {...listeners} />;
};

SortableHeaderCell.propTypes = {
    id: PropTypes.string,
    style: PropTypes.object,
};

export default SortableHeaderCell;
