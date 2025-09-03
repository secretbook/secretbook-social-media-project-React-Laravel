<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\PaymentIntent;
use App\Models\Payment;
use Razorpay\Api\Api;

class PaymentApiController extends Controller
{
    public function createOrder(Request $request)
    {
        $api = new Api(env('RAZORPAY_KEY'), env('RAZORPAY_SECRET'));

        $order = $api->order->create([
            'receipt' => 'rcptid_' . time(),
            'amount' => $request->amount * 100, // in paise
            'currency' => 'INR',
            'payment_capture' => 1
        ]);

        return response()->json([
            'id' => $order['id'],
            'amount' => $order['amount']
        ]);
    }

    public function verifyPayment(Request $request)
    {
        $data = [
            'razorpay_order_id' => $request->razorpay_order_id,
            'razorpay_payment_id' => $request->razorpay_payment_id,
            'razorpay_signature' => $request->razorpay_signature
        ];

        $api = new Api(env('RAZORPAY_KEY'), env('RAZORPAY_SECRET'));

        $generated_signature = hash_hmac('sha256', $data['razorpay_order_id'] . "|" . $data['razorpay_payment_id'], env('RAZORPAY_SECRET'));

        if ($generated_signature === $data['razorpay_signature']) {
            // Store to DB if needed
            return response()->json(['message' => 'Payment verified successfully']);
        }

        return response()->json(['error' => 'Signature verification failed'], 400);
    }
}

