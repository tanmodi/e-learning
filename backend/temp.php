<?php
require_once  ("simple_html_dom.php");

use Dompdf\Dompdf;
use Dompdf\Options;

$curl = curl_init();
curl_setopt($curl, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.2309.372 Safari/537.36');
curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($curl, CURLOPT_COOKIESESSION, true);
$cookie =  'cookie.txt';

$url_page_1 = 'https://uhbvn.org.in/web/portal/auth';
$url_page_3 = 'https://uhbvn.org.in/web/portal/view-bill';
$url_page_4 = 'https://uhbvn.org.in/web/portal/view-bill?p_p_id=ViewBill_WAR_Rapdrp_INSTANCE_lYirWcJEz7U6&p_p_lifecycle=2&p_p_state=normal&p_p_mode=view&p_p_resource_id=resourceUrl&p_p_cacheability=cacheLevelPage&p_p_col_id=column-1&p_p_col_pos=1&p_p_col_count=2&_ViewBill_WAR_Rapdrp_INSTANCE_lYirWcJEz7U6_myaction=redirect&_ViewBill_WAR_Rapdrp_INSTANCE_lYirWcJEz7U6_implicitModel=true&billId=';
$url_page_5 = 'https://uhbvn.org.in/web/portal/logout';

	$sql_up = mysqli_query($link, "SELECT * FROM b_can_user_pwd where b_can_no = '".$b_can_no."' ");
	$row_up = mysqli_fetch_assoc($sql_up);
	$user_name = $row_up["user_name"];
	$user_password = $row_up["user_password"];
	print $b_can_no .' | ' . $user_name . ' : '. $user_password .' <br>'; 

if ( $user_name != '' && $user_password != '') {	

try {

		// Page - 5
		curl_setopt($curl, CURLOPT_URL, $url_page_5);
		curl_setopt($curl, CURLOPT_POST, false);
		curl_setopt($curl, CURLOPT_COOKIEJAR, $cookie);
		curl_setopt($curl, CURLOPT_COOKIEFILE, $cookie);
		$page_5 = curl_exec($curl);
		//print $page_5;

		for ($i = 0; $i < 2; $i++) {
			// Page - 1
			curl_setopt($curl, CURLOPT_URL, $url_page_1);
			curl_setopt($curl, CURLOPT_POST, false);
			curl_setOpt($curl, CURLOPT_REFERER, $url_page_1);
			curl_setopt($curl, CURLOPT_COOKIEJAR, $cookie);
			curl_setopt($curl, CURLOPT_COOKIEFILE, $cookie);
			$page_1 = curl_exec($curl);
			//print $page_1;

			// Page - 2
			$DOM2 = new DOMDocument();
			@$DOM2->loadHTML($page_1);
			$inputs = $DOM2->getElementsByTagName('form');
			$pv_arr2 = array();
			foreach ($inputs as $inp) {
				$pv_arr2[$inp->getAttribute('name')] = $inp->getAttribute('action');
			}
			//print '<pre>'; print_r($pv_arr2);
			$loginForm = $pv_arr2['loginForm'];

			$postValues = array(
				'accountNo' => $b_can_no,
				'password' => $user_password,
				'submit' => 'LOGIN'
			);
			curl_setopt($curl, CURLOPT_URL, $loginForm);
			curl_setopt($curl, CURLOPT_POST, true);
			curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($postValues));
			curl_setOpt($curl, CURLOPT_REFERER, $url_page_1);
			curl_setopt($curl, CURLOPT_COOKIEJAR, $cookie);
			curl_setopt($curl, CURLOPT_COOKIEFILE, $cookie);
			$page_2 = curl_exec($curl);
			print '<br> login time  ' . $i + 1 . '<br>';
			//print $page_2;
			if (strpos($page_2, 'You do not have permission to access the requested resource.') === false) {
				break;
			}
		}

		if (strpos($page_2, 'Account No. or Password is incorrect') !== false) {
			$upd_query = "insert into b_ebill_log(eid, b_bill_month, status, b_discom, b_can_no) values ('".$eid."','".$b_bill_month."','06', '".$b_discom."','". $b_can_no."') ON DUPLICATE KEY UPDATE status='06' ";
			mysqli_query($link, $upd_query);
			exit;
		}

		// Page - 3
		curl_setopt($curl, CURLOPT_URL, $url_page_3);
		curl_setopt($curl, CURLOPT_POST, false);
		curl_setOpt($curl, CURLOPT_REFERER, 'https://uhbvn.org.in/web/portal/consumer-info');
		curl_setopt($curl, CURLOPT_COOKIEJAR, $cookie);
		curl_setopt($curl, CURLOPT_COOKIEFILE, $cookie);
		$page_3 = curl_exec($curl);
		//print $page_3;

		// Page -4
		$DOM3 = new DOMDocument();
		@$DOM3->loadHTML($page_3);
		$inputs = $DOM3->getElementsByTagName('a');
		$pv_arr3 = array();
		foreach ($inputs as $inp) {
			$pv_arr3[] = $inp->getAttribute('href');
		}
		//print '<pre>'; print_r($pv_arr3);
		foreach ($pv_arr3 as $pv_val) {
			if (strpos($pv_val, 'javascript') !== false) {
				$billid = $pv_val;
				break;
			}
		}
		$billid = explode("'", $billid)[1];
		print 'pdf link: ' . $url_page_4 . $billid . '<br>';

		curl_setopt($curl, CURLOPT_URL, $url_page_4 . $billid);
		curl_setopt($curl, CURLOPT_POST, false);
		curl_setOpt($curl, CURLOPT_REFERER, $url_page_3);

		curl_setopt($curl, CURLOPT_COOKIEJAR, $cookie);
		curl_setopt($curl, CURLOPT_COOKIEFILE, $cookie);
		$page_4 = curl_exec($curl);
		//print $page_4;

    //Print PDF
    $pdf_file_path = '/input/'.$bill_folder_path.'/'.$b_bill_month ;
    $pdf_file_name = $pdf_file_path .'/'.$b_can_no.'.pdf';
    if (!file_exists($base_path . $pdf_file_path)) { mkdir($base_path . $pdf_file_path, 0777, true); }
    $ret_val = file_put_contents($base_path . $pdf_file_name, $page_4 );	

    $txt_path = '/input/'.$bill_folder_path.'/'.$b_bill_month.'/txt' ;
    $txt_file_name = $txt_path .'/'.$b_can_no.'.txt';
    if (!file_exists($base_path . $txt_path)) { mkdir($base_path . $txt_path, 0777, true); }
    
    if ($ret_val != false) {
        // Parse pdf file and save in DB
        $parser = new \Smalot\PdfParser\Parser();
        $ebill_pdf    = $parser->parseFile($base_path . $pdf_file_name);
        $ebill_text = $ebill_pdf->getText();
        //print '<pre>'.$ebill_text;

		file_put_contents($base_path . $txt_file_name, $ebill_text);	
        $ebill_raw_data = 'File:'. $txt_file_name;

        print '30 - Success.<br>';
        $upd_query = "insert into b_ebill_log(eid, b_bill_month, status,  ebill_raw_data, ebill_pdf_file ,b_discom, b_can_no, ebill_download_dt, ebill_download_count) values ('".$eid."','".$b_bill_month."','30',  '".addslashes($ebill_raw_data)."', '".$pdf_file_name."','".$b_discom."','". $b_can_no."', now(), '1') ON DUPLICATE KEY UPDATE status='30', ebill_raw_data = '".addslashes($ebill_raw_data)."', ebill_pdf_file = '".$pdf_file_name."', ebill_download_dt = now(), ebill_download_count = ebill_download_count+1 ";
        mysqli_query($link, $upd_query);
    } else {
        print '14 - Error.<br>' ;
        $upd_query = "insert into b_ebill_log(eid, b_bill_month, status, b_discom, b_can_no) values ('".$eid."','".$b_bill_month."','14', '".$b_discom."','". $b_can_no."') ON DUPLICATE KEY UPDATE status='14' ";
        mysqli_query($link, $upd_query);		
    }
}
 catch(Exception $e) {
    print '10 - Error : ' .$e->getMessage();
	$upd_query = "insert into b_ebill_log(eid, b_bill_month, status, b_discom, b_can_no) values ('".$eid."','".$b_bill_month."','10', '".$b_discom."','". $b_can_no."') ON DUPLICATE KEY UPDATE status='10' ";
    mysqli_query($link, $upd_query);
}


} else {
    print '09 - User Password not found. <br>' ;
	$upd_query = "insert into b_ebill_log(eid, b_bill_month, status, b_discom, b_can_no) values ('".$eid."','".$b_bill_month."','09', '".$b_discom."','". $b_can_no."') ON DUPLICATE KEY UPDATE status='09' ";
    mysqli_query($link, $upd_query);
}

?>