"use client";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Layout/Navbar";
import Footer from "../../components/Layout/Footer";
export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("home");
  const [stats, setStats] = useState({
    users: 0,
    projects: 0,
    testimonials: 0,
    skills: 0,
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch users count
        const { count: usersCount } = await supabase
          .from("users")
          .select("*", { count: "exact", head: true });

        // Fetch projects count
        const { count: projectsCount } = await supabase
          .from("projects")
          .select("*", { count: "exact", head: true });

        // Fetch testimonials count
        const { count: testimonialsCount } = await supabase
          .from("testimonials")
          .select("*", { count: "exact", head: true });

        // Fetch skills count
        const { count: skillsCount } = await supabase
          .from("skills")
          .select("*", { count: "exact", head: true });

        setStats({
          users: usersCount || 0,
          projects: projectsCount || 0,
          testimonials: testimonialsCount || 0,
          skills: skillsCount || 0,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    const fetchRecentActivity = async () => {
      try {
        // Get recent updates from all tables
        const [homeUpdates, projectUpdates, testimonialUpdates] =
          await Promise.all([
            supabase
              .from("home_content")
              .select("*")
              .order("updated_at", { ascending: false })
              .limit(5),
            supabase
              .from("projects")
              .select("*")
              .order("updated_at", { ascending: false })
              .limit(5),
            supabase
              .from("testimonials")
              .select("*")
              .order("updated_at", { ascending: false })
              .limit(5),
          ]);

        const activities = [
          ...(homeUpdates.data?.map((item) => ({
            type: "Home Content",
            action: "Updated",
            title: item.title,
            time: item.updated_at,
          })) || []),
          ...(projectUpdates.data?.map((item) => ({
            type: "Project",
            action: "Updated",
            title: item.title,
            time: item.updated_at,
          })) || []),
          ...(testimonialUpdates.data?.map((item) => ({
            type: "Testimonial",
            action: "Updated",
            title: item.client_name,
            time: item.updated_at,
          })) || []),
        ];

        // Sort by time and take latest 5
        activities.sort((a, b) => new Date(b.time) - new Date(a.time));
        setRecentActivity(activities.slice(0, 5));
      } catch (error) {
        console.error("Error fetching recent activity:", error);
      }
    };

    fetchStats();
    fetchRecentActivity();
  }, []);

  const quickActions = [
    {
      title: "Add New Project",
      description: "Create a new portfolio project",
      icon: "➕",
      action: () => router.push("/#projects"),
    },
    {
      title: "Update Home Content",
      description: "Modify hero section content",
      icon: "🏠",
      action: () => router.push("/#home"),
    },
    {
      title: "Manage Testimonials",
      description: "Add or edit client testimonials",
      icon: "💬",
      action: () => router.push("/#testimonials"),
    },
    {
      title: "Update Skills",
      description: "Modify skills and proficiencies",
      icon: "⚡",
      action: () => router.push("/#skills"),
    },
  ];

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="mt-2 text-gray-600">
                Manage your portfolio content and settings
              </p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <span className="text-2xl">👥</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      Total Users
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stats.users}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <span className="text-2xl">📁</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      Projects
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stats.projects}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-yellow-100 rounded-lg">
                    <span className="text-2xl">💬</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      Testimonials
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stats.testimonials}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Skills</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stats.skills}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Quick Actions */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">
                      Quick Actions
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {quickActions.map((action, index) => (
                        <button
                          key={index}
                          onClick={action.action}
                          className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition duration-300 group"
                        >
                          <div className="text-2xl mr-4 group-hover:scale-110 transition duration-300">
                            {action.icon}
                          </div>
                          <div className="text-left">
                            <h4 className="font-medium text-gray-900 group-hover:text-blue-600">
                              {action.title}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {action.description}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">
                      Recent Activity
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {recentActivity.length > 0 ? (
                        recentActivity.map((activity, index) => (
                          <div
                            key={index}
                            className="flex items-start space-x-3"
                          >
                            <div className="flex-shrink-0">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900">
                                {activity.type} - {activity.action}
                              </p>
                              <p className="text-sm text-gray-600 truncate">
                                {activity.title}
                              </p>
                              <p className="text-xs text-gray-500">
                                {new Date(activity.time).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500 text-center py-4">
                          No recent activity
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section Management */}
            <div className="mt-8 bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">
                  Content Management
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { name: "Home", href: "/#home", icon: "🏠", color: "blue" },
                    {
                      name: "About",
                      href: "/#about",
                      icon: "👤",
                      color: "green",
                    },
                    {
                      name: "Experience",
                      href: "/#experience",
                      icon: "💼",
                      color: "yellow",
                    },
                    {
                      name: "Projects",
                      href: "/#projects",
                      icon: "📁",
                      color: "purple",
                    },
                    {
                      name: "Skills",
                      href: "/#skills",
                      icon: "⚡",
                      color: "red",
                    },
                    {
                      name: "Testimonials",
                      href: "/#testimonials",
                      icon: "💬",
                      color: "indigo",
                    },
                    {
                      name: "Contact",
                      href: "/#contact",
                      icon: "📞",
                      color: "pink",
                    },
                  ].map((section) => (
                    <button
                      key={section.name}
                      onClick={() => {
                        router.push("/");
                        setTimeout(() => {
                          document
                            .querySelector(section.href.replace("/", ""))
                            ?.scrollIntoView({
                              behavior: "smooth",
                            });
                        }, 100);
                      }}
                      className={`flex items-center p-4 border border-gray-200 rounded-lg hover:border-${section.color}-500 hover:bg-${section.color}-50 transition duration-300 group`}
                    >
                      <div
                        className={`text-2xl mr-4 group-hover:scale-110 transition duration-300`}
                      >
                        {section.icon}
                      </div>
                      <div className="text-left">
                        <h4
                          className={`font-medium text-gray-900 group-hover:text-${section.color}-600`}
                        >
                          {section.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          Manage {section.name.toLowerCase()} content
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
