// JavaScript Document
window.onload = function()
{
	// 移动端菜单按钮
	document.getElementById("m_botton").addEventListener("click", NavClick);
	function NavClick()
	{
		var navmenu = document.getElementById('m_menu');
		
		if(navmenu.style.display=='block')
		{
			navmenu.style.display='none';
			//navmenu.className='nav';
		}
		else
		{
			navmenu.style.display='block';
			//navmenu.className='nav fadeInDown animated';
		}
	}
}