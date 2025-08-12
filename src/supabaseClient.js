import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://crnzpldmykvgpznnzvzj.supabase.co'; // Substitua pela sua URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNybnpwbGRteWt2Z3B6bm56dnpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5NTA0NDIsImV4cCI6MjA3MDUyNjQ0Mn0.JKyB_o9EC8PL0SJQQhgfM4wiactuO__k6-U87PLJGes'; // Substitua pela sua chave

export const supabase = createClient(supabaseUrl, supabaseKey);