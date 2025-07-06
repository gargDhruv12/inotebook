import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';
import { Card, CardContent, CardHeader, CardTitle } from '../Components/ui/card';
import { Button } from '../Components/ui/button';
import { Edit, Trash2, Tag, Calendar } from 'lucide-react';

const Noteitem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote, categoryName } = props;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <CardTitle className="text-lg font-semibold line-clamp-2">
                        {note.title}
                    </CardTitle>
                    <div className="flex space-x-1">
                        <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0"
                            onClick={() => updateNote(note)}
                        >
                            <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                            onClick={() => {
                                deleteNote(note._id);
                                props.showAlert("Deleted Successfully", "success");
                            }}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground line-clamp-3">
                    {note.description}
                </p>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center space-x-2">
                        {note.tag && (
                            <div className="flex items-center space-x-1">
                                <Tag className="h-3 w-3" />
                                <span>{note.tag}</span>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(note.date)}</span>
                    </div>
                </div>

                {categoryName && categoryName !== "No Category" && (
                    <div className="flex items-center space-x-1 text-xs">
                        <span className="text-muted-foreground">Category:</span>
                        <span className="font-medium">{categoryName}</span>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

export default Noteitem
