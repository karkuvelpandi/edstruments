"use client";
import React, { useState } from "react";
import { TextField, IconButton, Box, Typography, Button } from "@mui/material";
import { BiSend } from "react-icons/bi";
import SectionHeader from "../ui/SectionHeader";
import ChatIcon from "@mui/icons-material/Chat";
import ModeIcon from "@mui/icons-material/Mode";
import DeleteIcon from "@mui/icons-material/Delete";
import SubmitButton from "./components/SubmitButton";
import { useAtom } from "jotai";
import { invoiceDetailsAtom } from "@/store";
import { generateUniqueId } from "@/store/utils";

const CommentsForm = ({
  onNavigate,
}: {
  onNavigate: ( step: string) => void;
}) => {
  const [globalInvoiceDetails, setGlobalInvoiceDetails] =
    useAtom(invoiceDetailsAtom);
  const [currentComment, setCurrentComment] = useState<string>("");
  const [comments, setComments] = useState<{ id: string; text: string }[]>(
    globalInvoiceDetails.comments
  );
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editedText, setEditedText] = useState<string>("");

  // Add comment with a unique ID
  const handleAddComment = () => {
    if (currentComment.trim()) {
      const newComment = {
        id: generateUniqueId(),
        text: currentComment.trim(),
      };
      setComments((prev) => [...prev, newComment]);
      setGlobalInvoiceDetails((prev) => ({
        ...prev,
        comments: [...prev.comments, newComment],
      }));
      setCurrentComment("");
    }
  };

  // Start editing a comment
  const handleStartEdit = (id: string, text: string) => {
    setEditingCommentId(id);
    setEditedText(text);
  };

  // Save edited comment
  const handleSaveEdit = () => {
    if (editedText.trim() && editingCommentId) {
      setComments((prev) =>
        prev.map((comment) =>
          comment.id === editingCommentId
            ? { ...comment, text: editedText.trim() }
            : comment
        )
      );

      setGlobalInvoiceDetails((prev) => ({
        ...prev,
        comments: prev.comments.map((comment) =>
          comment.id === editingCommentId
            ? { ...comment, text: editedText.trim() }
            : comment
        ),
      }));

      setEditingCommentId(null);
      setEditedText("");
    }
  };

  const handleDeleteComment = (id: string) => {
    setComments((prev) => prev.filter((comment) => comment.id !== id));

    setGlobalInvoiceDetails((prev) => ({
      ...prev,
      comments: prev.comments.filter((comment) => comment.id !== id),
    }));
  };

  return (
    <div className="flex flex-col justify-between !h-full">
      <div className="flex-1">
        <SectionHeader icon={<ChatIcon color="primary" />} title="Comments" />

        <TextField
          fullWidth
          className="!mt-2 bg-white"
          size="small"
          value={currentComment}
          onChange={(e) => setCurrentComment(e.target.value)}
          placeholder="Add a comment and use @Name to tag someone"
          InputProps={{
            endAdornment: (
              <IconButton disabled={!currentComment} onClick={handleAddComment}>
                <BiSend color="blue" className="w-6 h-6" />
              </IconButton>
            ),
          }}
        />

        {comments.length > 0 && (
          <Box mt={2}>
            <Typography variant="h6">All Comments</Typography>
            {comments.map((comment) => (
              <Box
                key={comment.id}
                mb={2}
                p={1}
                px={2}
                bgcolor={"white"}
                borderRadius={1}
              >
                {editingCommentId === comment.id ? (
                  <div className="flex gap-2">
                    <TextField
                      fullWidth
                      size="small"
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                    />
                    <Button
                      onClick={handleSaveEdit}
                      color="primary"
                      variant="contained"
                      size="small"
                    >
                      Save
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between text-gray-500">
                    <p>{comment.text} </p>
                    <div className="flex">
                      <Button
                        size="small"
                        onClick={() =>
                          handleStartEdit(comment.id, comment.text)
                        }
                      >
                        <ModeIcon />
                      </Button>
                      <Button
                        size="small"
                        onClick={() => handleDeleteComment(comment.id)}
                      >
                        <DeleteIcon />
                      </Button>
                    </div>
                  </div>
                )}
              </Box>
            ))}
          </Box>
        )}
      </div>
      <div>
        <SubmitButton
          backButton={
            <Button
              type="button"
              variant="outlined"
              color="primary"
              onClick={() => onNavigate?.("invoice")}
              sx={{ textTransform: "none" }}
            >
              Back
            </Button>
          }
          onNavigate={onNavigate}
        />
      </div>
    </div>
  );
};

export default CommentsForm;
