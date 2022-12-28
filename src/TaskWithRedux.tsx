import React, {ChangeEvent, memo} from 'react';
import {TaskType} from './Todolist';
import {Checkbox, IconButton} from '@mui/material';
import {EditableSpan} from './EditableSpan';
import {Delete} from '@mui/icons-material';
import {useDispatch} from 'react-redux';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasks-reducer';

type TaskPropsType = {
    task:TaskType
    todolistId: string
}

export const TaskWithRedux = memo (({task,todolistId}: TaskPropsType) => {

    const dispatch = useDispatch()
    const {id, title, isDone} = task

    dispatch(removeTaskAC(id, todolistId))
    const onClickHandler = () => dispatch(removeTaskAC(id, todolistId))
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        const action = changeTaskStatusAC(id,  newIsDoneValue, todolistId);
        dispatch(action);
    }
    const onTitleChangeHandler = (newValue: string) => {
        dispatch(changeTaskTitleAC(id, newValue, todolistId));
    }

    return <div className={isDone ? "is-done" : ""}>
        <Checkbox
            checked={isDone}
            color="primary"
            onChange={onChangeHandler}
        />

        <EditableSpan value={title} onChange={onTitleChangeHandler} />
        <IconButton onClick={onClickHandler}>
            <Delete />
        </IconButton>
    </div>
})
