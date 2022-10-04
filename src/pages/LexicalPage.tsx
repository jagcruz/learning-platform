import type { FC, ChangeEvent } from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Tooltip from '@mui/material/Tooltip';

import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';

import LexicalEditor from 'src/components/LexicalRichEditor';

const LexicalPage: FC = () => {
    const [debug, setDebug] = useState(false);
    const [savedState, setSavedState] = useState('');
    const [readedState, setReadedState] = useState<string | null>(null);

    useEffect(() => {
        setReadedState(null);
    }, [savedState]);

    return (
        <Box>
            <Typography variant='h3'>Material Rich Text Editor</Typography>

            <Box
                width={'100%'}
                display='flex'
                pb={3}
                px={3}
                flexDirection='column'
                justifyContent='center'
                alignItems='center'
            >
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={debug}
                                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                    setDebug(event.target.checked)
                                }
                            />
                        }
                        label='Debug'
                    />
                </FormGroup>

                <LexicalEditor
                    namespace='MaterialRich'
                    editable
                    onChangeState={(editorState) => {
                        console.log('state %o', JSON.parse(JSON.stringify(editorState)));
                        setSavedState(JSON.stringify(editorState));
                    }}
                    debug={debug}
                />
            </Box>

            <Grid container>
                <Grid item md={6}>
                    <TextField
                        fullWidth
                        multiline
                        maxRows={6}
                        label='Serialized Editor State to Save'
                        size='small'
                        margin='none'
                        value={savedState}
                    />
                </Grid>

                <Grid item>
                    <Tooltip arrow title='Load State' placement='top'>
                        <span>
                            <IconButton
                                disabled={!!readedState}
                                color='success'
                                onClick={() => {
                                    setReadedState(savedState);
                                }}
                            >
                                <DoubleArrowIcon />
                            </IconButton>
                        </span>
                    </Tooltip>
                </Grid>

                <Grid
                    item
                    md
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        border: 1,
                        borderStyle: 'dashed',
                        borderColor: 'error.main',
                        borderRadius: 2,
                        p: 1
                    }}
                >
                    {readedState && (
                        <>
                            <Typography
                                variant='caption'
                                fontWeight='bold'
                                textTransform='uppercase'
                                color='error.main'
                            >
                                Read-only mode view that loads a previously saved state
                            </Typography>

                            <LexicalEditor
                                namespace='MaterialRichRead'
                                editable={false}
                                initialState={readedState}
                            />
                        </>
                    )}
                </Grid>
            </Grid>

            <Box mt={10}>
                <Typography variant='overline'>Other Examples</Typography>

                <Box component='ul'>
                    <Box component='li'>
                        <Typography
                            component='a'
                            href='https://codesandbox.io/s/lexical-rich-text-example-5tncvy'
                        >
                            Rich Text Editor Official Example
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default LexicalPage;
