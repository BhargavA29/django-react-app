import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from '@/lib/axios';
import { setCredentials } from '@/features/auth/authSlice';
import Layout from '@/components/layout/Layout';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

function ProfilePage() {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const { toast } = useToast();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        first_name: user?.first_name || '',
        last_name: user?.last_name || '',
        email: user?.email || '',
        mobile: user?.mobile || '',
        address: user?.address || ''
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                first_name: user.first_name || '',
                last_name: user.last_name || '',
                email: user.email || '',
                mobile: user.mobile || '',
                address: user.address || ''
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.patch('auth/profile/', formData);
            dispatch(setCredentials({
                user: response.data,
                token: localStorage.getItem('token')
            }));
            setIsEditing(false);
            toast({
                title: "Success",
                description: "Profile updated successfully",
            });
        } catch (error) {
            console.error('Update error:', error);
            toast({
                title: "Error",
                description: error.response?.data?.error || "Failed to update profile",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Layout>
            <div className="container mx-auto py-6 space-y-6">
                <Card className="border-none">
                    <CardHeader>
                        <div className="flex items-center space-x-4">
                            <Avatar className="h-24 w-24">
                                <AvatarImage src={user?.avatar} alt={user?.username} />
                                <AvatarFallback className="text-lg">
                                    {user?.first_name?.[0]}{user?.last_name?.[0]}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <CardTitle className="text-2xl">
                                    {user?.first_name} {user?.last_name}
                                </CardTitle>
                                <CardDescription>{user?.email}</CardDescription>
                                <Badge variant="secondary" className="mt-2">
                                    {user?.role}
                                </Badge>
                            </div>
                        </div>
                    </CardHeader>
                </Card>

                <Card className="border-none">
                    <CardHeader>
                        <CardTitle>Profile Information</CardTitle>
                        <CardDescription>
                            {isEditing
                                ? "Update your profile information below"
                                : "View and manage your profile details"}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="first_name">First Name</Label>
                                    {isEditing ? (
                                        <Input
                                            id="first_name"
                                            name="first_name"
                                            value={formData.first_name}
                                            onChange={handleChange}
                                            disabled={!isEditing || isLoading}
                                        />
                                    ) : (
                                        <p className="text-sm text-muted-foreground pt-2">
                                            {formData.first_name || '-'}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="last_name">Last Name</Label>
                                    {isEditing ? (
                                        <Input
                                            id="last_name"
                                            name="last_name"
                                            value={formData.last_name}
                                            onChange={handleChange}
                                            disabled={!isEditing || isLoading}
                                        />
                                    ) : (
                                        <p className="text-sm text-muted-foreground pt-2">
                                            {formData.last_name || '-'}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                {isEditing ? (
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        disabled={!isEditing || isLoading}
                                    />
                                ) : (
                                    <p className="text-sm text-muted-foreground pt-2">
                                        {formData.email || '-'}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="mobile">Mobile Number</Label>
                                {isEditing ? (
                                    <Input
                                        id="mobile"
                                        name="mobile"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        disabled={!isEditing || isLoading}
                                    />
                                ) : (
                                    <p className="text-sm text-muted-foreground pt-2">
                                        {formData.mobile || '-'}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="address">Address</Label>
                                {isEditing ? (
                                    <Textarea
                                        id="address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        disabled={!isEditing || isLoading}
                                        rows={3}
                                    />
                                ) : (
                                    <p className="text-sm text-muted-foreground pt-2">
                                        {formData.address || '-'}
                                    </p>
                                )}
                            </div>

                            <div className="mb-4">
                                <Label>Role</Label>
                                <p className="text-sm text-muted-foreground">
                                    {user?.role || 'N/A'}
                                </p>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-end space-x-4">
                        {isEditing ? (
                            <>
                                <Button
                                    variant="outline"
                                    onClick={() => setIsEditing(false)}
                                    disabled={isLoading}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    onClick={handleSubmit}
                                >
                                    {isLoading ? "Saving..." : "Save Changes"}
                                </Button>
                            </>
                        ) : (
                            <Button onClick={() => setIsEditing(true)}>
                                Edit Profile
                            </Button>
                        )}
                    </CardFooter>
                </Card>
            </div>
        </Layout>
    );
}

export default ProfilePage;