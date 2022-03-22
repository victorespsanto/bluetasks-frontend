import * as React from 'react';
import { Routes, Route, useParams } from 'react-router-dom';

function ProfilePage() {
  // Get the userId param from the URL.
  const { id } = useParams();
  // ...
}

export default ProfilePage;
