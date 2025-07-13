import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Camera,
  Edit3,
  Save,
  X,
  Calendar,
  Shield,
  Mail,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/layout/Navbar";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";

const Profile: React.FC = () => {
  const { user, updateProfile, updatePhoto } = useAuth();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.fullName || "",
    email: user?.email || "",
  });

  const handleSave = () => {
    if (!editData.name.trim() || !editData.email.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (!/\S+@\S+\.\S+/.test(editData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    updateProfile(editData);
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleCancel = () => {
    setEditData({
      name: user?.fullName || "",
      email: user?.email || "",
    });
    setIsEditing(false);
  };

  const handleAvatarUpload = () => {
    if (!fileInputRef.current?.files?.[0]) return;

    updatePhoto(fileInputRef.current.files[0])
      .then(() =>
        toast({ title: "Success", description: "Avatar updated successfully!" })
      )
      .catch(() =>
        toast({
          title: "Error",
          description: "Failed to upload avatar.",
          variant: "destructive",
        })
      );
  };

  if (!user) return <div>Yuklanmoqda</div>;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto p-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gradient mb-2">Profile</h1>
            <p className="text-muted-foreground">
              Manage your account information and preferences
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="card-glass border-0 shadow-soft">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="relative inline-block">
                      <Avatar className="h-24 w-24 mx-auto mb-4">
                        <AvatarImage
                          src={user.profilePic}
                          alt={user.fullName}
                        />
                      </Avatar>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleAvatarUpload}
                      />
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute -bottom-2 -right-2 p-2 bg-gradient-primary text-white rounded-full shadow-soft"
                      >
                        <Camera className="h-4 w-4" />
                      </motion.button>
                    </div>

                    <h2 className="text-xl font-semibold mb-1">
                      {user.fullName}
                    </h2>
                    <p className="text-muted-foreground mb-4">{user.email}</p>

                    <Badge
                      variant={
                        user.accountStatus === "Active"
                          ? "default"
                          : "secondary"
                      }
                      className="mb-4"
                    >
                      <Shield className="h-3 w-3 mr-1" />
                      {user.accountStatus}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Account Stats */}
              <Card className="card-glass border-0 shadow-soft mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">Account Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Member Since</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {new Date(user.updatedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">
                        Account Status
                      </span>
                    </div>
                    <Badge
                      variant={
                        user.accountStatus === "Active"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {user.accountStatus}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Editable Profile Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              <Card className="card-glass border-0 shadow-soft">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Personal Information
                      </CardTitle>
                      <CardDescription>
                        Update your personal details and contact information
                      </CardDescription>
                    </div>
                    {!isEditing ? (
                      <Button
                        onClick={() => setIsEditing(true)}
                        variant="outline"
                        size="sm"
                      >
                        <Edit3 className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button
                          onClick={handleSave}
                          size="sm"
                          className="btn-gradient"
                        >
                          <Save className="h-4 w-4 mr-2" />
                          Save
                        </Button>
                        <Button
                          onClick={handleCancel}
                          variant="outline"
                          size="sm"
                        >
                          <X className="h-4 w-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      {isEditing ? (
                        <Input
                          id="name"
                          value={editData.name}
                          onChange={(e) =>
                            setEditData((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                          placeholder="Enter your full name"
                        />
                      ) : (
                        <div className="p-3 bg-muted/30 rounded-md flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span>{user.fullName}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      {isEditing ? (
                        <Input
                          id="email"
                          type="email"
                          value={editData.email}
                          onChange={(e) =>
                            setEditData((prev) => ({
                              ...prev,
                              email: e.target.value,
                            }))
                          }
                          placeholder="Enter your email"
                        />
                      ) : (
                        <div className="p-3 bg-muted/30 rounded-md flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span>{user.email}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {isEditing && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="bg-muted/20 rounded-lg p-4"
                    >
                      <p className="text-sm text-muted-foreground">
                        💡 <strong>Tip:</strong> Make sure your email is valid
                        as it's used for account recovery and notifications.
                      </p>
                    </motion.div>
                  )}
                </CardContent>
              </Card>

              {/* Security Settings */}
              <Card className="card-glass border-0 shadow-soft mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Security Settings
                  </CardTitle>
                  <CardDescription>
                    Manage your account security and privacy settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() =>
                      toast({
                        title: "Feature Coming Soon",
                        description:
                          "Password change functionality will be available soon!",
                      })
                    }
                  >
                    Change Password
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() =>
                      toast({
                        title: "Feature Coming Soon",
                        description:
                          "Two-factor authentication setup will be available soon!",
                      })
                    }
                  >
                    Enable Two-Factor Authentication
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
