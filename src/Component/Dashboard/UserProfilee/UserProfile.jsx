import React, { useEffect, useState } from "react";
import {
    FaUser,
    FaEnvelope,
    FaPhone,
    FaHome,
    FaCity,
    FaGlobe,
    FaInfoCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
    const [isEdit, setIsEdit] = useState(false);

    const [userInfo, setUserInfo] = useState({
        name: "",
        email: "",
    });

    const [form, setForm] = useState({
        phone: "",
        address: "",
        city: "",
        country: "",
        bio: "",
    });

    const [phoneCode, setPhoneCode] = useState("+92");

    // ================= COUNTRIES =================
    const countries = [
        { name: "Pakistan", code: "+92", flag: "🇵🇰" },
        { name: "India", code: "+91", flag: "🇮🇳" },
        { name: "United States", code: "+1", flag: "🇺🇸" },
        { name: "United Kingdom", code: "+44", flag: "🇬🇧" },
        { name: "UAE", code: "+971", flag: "🇦🇪" },
        { name: "Canada", code: "+1", flag: "🇨🇦" },
        { name: "Australia", code: "+61", flag: "🇦🇺" },
        { name: "Germany", code: "+49", flag: "🇩🇪" },
    ];

    // ================= LOAD USER =================
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) return;

        setUserInfo({
            name: user.name,
            email: user.email,
        });

        fetch(`https://ecommerence-backend-jade.vercel.app/api/profile/${user.email}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.data) {
                    setForm(data.data);
                    setIsEdit(false);
                } else {
                    setIsEdit(true);
                }
            })
            .catch((err) => console.log(err));
    }, []);

    // ================= HANDLE CHANGE =================
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    // ================= SAVE PROFILE =================
    const handleSave = async () => {
        const user = JSON.parse(localStorage.getItem("user"));

        const res = await fetch("https://ecommerence-backend-jade.vercel.app/api/profile/save", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: user.email,
                name: user.name,
                phone: phoneCode + form.phone,
                address: form.address,
                city: form.city,
                country: form.country,
                bio: form.bio,
            }),
        });

        const data = await res.json();
        alert(data.message);
        setIsEdit(false);
    };

    const navigate = useNavigate();
    const handlebuttons = () => {
        navigate("/")
    }

    return (
        <div className="profile-bg">

            <div className="profile-card">

                {/* HEADER */}
                <div className="header">
                    <div className="avatar">👤</div>
                    <h2 className="title">User Profile</h2>
                    <p className="subtitle">Manage your personal information</p>
                </div>

                {/* GRID */}
                <div className="grid">

                    {/* NAME */}
                    <div className="field">
                        <label><FaUser /> Full Name</label>
                        <input value={userInfo.name} disabled />
                    </div>

                    {/* EMAIL */}
                    <div className="field">
                        <label><FaEnvelope /> Email</label>
                        <input value={userInfo.email} disabled />
                    </div>

                    {/* PHONE */}
                    <div className="field full">
                        <label><FaPhone /> Phone Number</label>

                        <div className="phone-row">

                            <select
                                value={phoneCode}
                                onChange={(e) => setPhoneCode(e.target.value)}
                                disabled={!isEdit}
                            >
                                {countries.map((c, i) => (
                                    <option key={i} value={c.code}>
                                        {c.flag} {c.name} ({c.code})
                                    </option>
                                ))}
                            </select>

                            <input
                                name="phone"
                                value={form.phone || ""}
                                onChange={handleChange}
                                disabled={!isEdit}
                                placeholder="Enter number"
                            />

                        </div>
                    </div>

                    {/* ADDRESS */}
                    <div className="field full">
                        <label><FaHome /> Address</label>
                        <input name="address" value={form.address || ""} onChange={handleChange} disabled={!isEdit} />
                    </div>

                    {/* CITY */}
                    <div className="field">
                        <label><FaCity /> City</label>
                        <input name="city" value={form.city || ""} onChange={handleChange} disabled={!isEdit} />
                    </div>

                    {/* COUNTRY */}
                    <div className="field">
                        <label><FaGlobe /> Country</label>
                        <select name="country" value={form.country || ""} onChange={handleChange} disabled={!isEdit}>
                            <option value="">Select Country</option>
                            {countries.map((c, i) => (
                                <option key={i}>
                                    {c.flag} {c.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* BIO */}
                    <div className="field full">
                        <label><FaInfoCircle /> Bio</label>
                        <textarea name="bio" value={form.bio || ""} onChange={handleChange} disabled={!isEdit} />
                    </div>

                </div>
                <div className="button-wrapper">

                    {/* SAVE / EDIT */}
                    <div className="btn-box">
                        {isEdit ? (
                            <button className="btn-primary" onClick={handleSave}>
                                Save Profile
                            </button>
                        ) : (
                            <button className="btn-primary" onClick={() => setIsEdit(true)}>
                                Edit Profile
                            </button>
                        )}
                    </div>

                    {/* GO BACK */}
                    <div className="btn-box">
                        <button className="btn-secondary" onClick={handlebuttons}>
                            Go Back
                        </button>
                    </div>

                </div>
            </div>

            {/* ================= CSS ================= */}
            <style>{`
       
/* ================= BASE LAYOUT ================= */
.profile-bg{
  min-height:100vh;
  display:flex;
  justify-content:center;
  align-items:center;
  background:#f5f7fb;
  padding:20px;
}

.profile-card{
  width:100%;
  max-width:850px;
  background:#fff;
  border-radius:18px;
  padding:30px;
  color:#111;
  box-shadow:0 10px 30px rgba(0,0,0,0.08);
}

/* ================= HEADER ================= */
.header{
  text-align:center;
  margin-bottom:25px;
}

.avatar{
  font-size:50px;
}

.title{
  margin:10px 0 5px;
}

.subtitle{
  opacity:0.6;
  font-size:14px;
}

/* ================= GRID ================= */
.grid{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:15px;
}

.field{
  display:flex;
  flex-direction:column;
  gap:6px;
}

.field.full{
  grid-column: span 2;
}

label{
  font-size:13px;
  color:#555;
  display:flex;
  align-items:center;
  gap:6px;
}

/* ================= INPUTS ================= */
input, select, textarea{
  padding:12px;
  border-radius:10px;
  border:1px solid rgba(0,0,0,0.08);
  outline:none;
  background: rgba(0,0,0,0.03);
  color:#111;
  transition:0.2s;
}

input:focus, select:focus, textarea:focus{
  border-color:#3b82f6;
  background: rgba(59,130,246,0.05);
}

textarea{
  min-height:90px;
  resize:none;
}

/* ================= PHONE ROW ================= */
.phone-row{
  display:flex;
  gap:10px;
}

.phone-row select{
  width:160px;
}

/* ================= BUTTONS (IMPORTANT FIX) ================= */
.button-wrapper{
  display:flex;
  flex-direction:row;
  gap:12px;
  margin-top:30px;
}

.btn-box{
  flex:1;
}

.btn-primary,
.btn-secondary{
  width:100%;
  padding:12px;
  border:none;
  border-radius:10px;
  font-size:15px;
  font-weight:600;
  cursor:pointer;
  transition:0.3s;
}

/* PRIMARY */
.btn-primary{
  background:#3b82f6;
  color:white;
}

.btn-primary:hover{
  background:#2563eb;
  transform:scale(1.03);
}

/* SECONDARY */
.btn-secondary{
  background:#6b7280;
  color:white;
}

.btn-secondary:hover{
  background:#4b5563;
  transform:scale(1.03);
}

/* ================= DISABLED ================= */
input:disabled,
textarea:disabled,
select:disabled{
  opacity:0.6;
  cursor:not-allowed;
}

/* ================= MOBILE RESPONSIVE ================= */
@media (max-width: 768px){

  .profile-card{
    padding:20px;
  }

  .grid{
    grid-template-columns:1fr;
  }

  .field.full{
    grid-column: span 1;
  }

  .phone-row{
    flex-direction:column;
  }

  .phone-row select{
    width:100%;
  }

  .button-wrapper{
    flex-direction:column;
  }

  button{
    width:100%;
  }

  .title{
    font-size:20px;
  }

  .avatar{
    font-size:40px;
  }
}

        }
      `}</style>

        </div>
    );
};

export default UserProfile;